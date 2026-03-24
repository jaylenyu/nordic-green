/**
 * Data Migration Script: MySQL → PostgreSQL
 *
 * Usage:
 *   1. Set MYSQL_DATABASE_URL and DATABASE_URL in .env
 *   2. Run: npx ts-node prisma/scripts/migrate-from-mysql.ts --dry-run
 *   3. Verify output, then run: npx ts-node prisma/scripts/migrate-from-mysql.ts
 *
 * What this script does:
 *   - Migrates all tables from MySQL to PostgreSQL
 *   - Converts WishList.productIds (CSV) → WishlistItem rows
 *   - Converts Orders.orderItemIds (CSV) → OrderItem.orderId FK
 *   - Fixes Comment.iamges typo → images
 *   - Skips the old lowercase `user` model (was unused duplicate)
 */

import { PrismaClient as MySQLClient } from '@prisma/client';

const isDryRun = process.argv.includes('--dry-run');

// MySQL client pointing to old database
const mysqlPrisma = new MySQLClient({
  datasources: { db: { url: process.env.MYSQL_DATABASE_URL } },
});

// PostgreSQL client (new schema)
const pgPrisma = new MySQLClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

async function log(message: string) {
  const prefix = isDryRun ? '[DRY-RUN] ' : '';
  console.log(`${prefix}${message}`);
}

async function migrate() {
  console.log(`Starting migration... DRY_RUN=${isDryRun}\n`);

  try {
    await mysqlPrisma.$connect();
    await pgPrisma.$connect();

    // 1. Migrate Categories
    const categories = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM categories`;
    log(`Found ${categories.length} categories`);
    if (!isDryRun) {
      for (const cat of categories) {
        await pgPrisma.category.upsert({
          where: { id: cat.id },
          create: { id: cat.id, name: cat.name },
          update: { name: cat.name },
        });
      }
    }

    // 2. Migrate Products
    const products = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM products`;
    log(`Found ${products.length} products`);
    if (!isDryRun) {
      for (const p of products) {
        await pgPrisma.product.upsert({
          where: { id: p.id },
          create: {
            id: p.id,
            name: p.name,
            imageUrl: p.image_url,
            categoryId: p.category_id,
            contents: p.contents,
            price: p.price,
            createdAt: p.createAt ?? new Date(),
          },
          update: {
            name: p.name,
            imageUrl: p.image_url,
          },
        });
      }
    }

    // 3. Migrate Users (NextAuth User model)
    const users = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM User`;
    log(`Found ${users.length} users`);
    if (!isDryRun) {
      for (const u of users) {
        await pgPrisma.user.upsert({
          where: { id: u.id },
          create: {
            id: u.id,
            name: u.name,
            email: u.email,
            emailVerified: u.emailVerified,
            image: u.image,
          },
          update: { name: u.name, image: u.image },
        });
      }
    }

    // 4. Migrate Accounts
    const accounts = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM Account`;
    log(`Found ${accounts.length} accounts`);
    if (!isDryRun) {
      for (const a of accounts) {
        await pgPrisma.account.upsert({
          where: { provider_providerAccountId: { provider: a.provider, providerAccountId: a.providerAccountId } },
          create: {
            id: a.id,
            userId: a.userId,
            type: a.type,
            provider: a.provider,
            providerAccountId: a.providerAccountId,
            refresh_token: a.refresh_token,
            access_token: a.access_token,
            expires_at: a.expires_at,
            token_type: a.token_type,
            scope: a.scope,
            id_token: a.id_token,
            session_state: a.session_state,
          },
          update: {},
        });
      }
    }

    // 5. Migrate Sessions
    const sessions = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM Session`;
    log(`Found ${sessions.length} sessions`);
    if (!isDryRun) {
      for (const s of sessions) {
        await pgPrisma.session.upsert({
          where: { sessionToken: s.sessionToken },
          create: {
            id: s.id,
            sessionToken: s.sessionToken,
            userId: s.userId,
            expires: s.expires,
          },
          update: { expires: s.expires },
        });
      }
    }

    // 6. Migrate Cart
    const cartItems = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM Cart`;
    log(`Found ${cartItems.length} cart items`);
    if (!isDryRun) {
      for (const c of cartItems) {
        await pgPrisma.cart.upsert({
          where: { id: c.id },
          create: {
            id: c.id,
            userId: c.userId,
            productId: c.productId,
            quantity: c.quantity,
            amount: c.amount,
          },
          update: { quantity: c.quantity, amount: c.amount },
        });
      }
    }

    // 7. Migrate OrderItems (before Orders to get IDs)
    const orderItems = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM OrderItem`;
    log(`Found ${orderItems.length} order items`);

    // 8. Migrate Orders + wire OrderItems via CSV → FK
    const orders = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM Orders`;
    log(`Found ${orders.length} orders`);

    if (!isDryRun) {
      for (const o of orders) {
        const order = await pgPrisma.order.upsert({
          where: { id: o.id },
          create: {
            id: o.id,
            userId: o.userId,
            receiver: o.receiver,
            address: o.address,
            phoneNumber: o.phoneNumber,
            createdAt: o.createAt ?? new Date(),
            status: o.status ?? 0,
          },
          update: { status: o.status },
        });

        // Parse CSV orderItemIds and wire FK
        if (o.orderItemIds) {
          const itemIds = (o.orderItemIds as string)
            .split(',')
            .map((id: string) => parseInt(id.trim(), 10))
            .filter((id: number) => !isNaN(id));

          for (const itemId of itemIds) {
            const item = orderItems.find((oi) => oi.id === itemId);
            if (!item) {
              console.warn(`  ⚠ OrderItem ${itemId} not found for Order ${order.id}`);
              continue;
            }
            await pgPrisma.orderItem.upsert({
              where: { id: item.id },
              create: {
                id: item.id,
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                amount: item.amount,
              },
              update: { orderId: order.id },
            });
          }
        }
      }
    }

    // 9. Migrate WishLists: CSV → WishlistItem join table
    const wishlists = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM WishList`;
    log(`Found ${wishlists.length} wishlists`);

    if (!isDryRun) {
      for (const w of wishlists) {
        const wishlist = await pgPrisma.wishlist.upsert({
          where: { userId: w.userId },
          create: { userId: w.userId },
          update: {},
        });

        if (w.productIds) {
          const productIds = (w.productIds as string)
            .split(',')
            .map((id: string) => parseInt(id.trim(), 10))
            .filter((id: number) => !isNaN(id));

          log(`  Wishlist ${wishlist.id}: migrating ${productIds.length} product IDs`);

          for (const productId of productIds) {
            await pgPrisma.wishlistItem.upsert({
              where: { wishlistId_productId: { wishlistId: wishlist.id, productId } },
              create: { wishlistId: wishlist.id, productId },
              update: {},
            });
          }
        }
      }
    }

    // 10. Migrate Comments (fix iamges → images typo)
    const comments = await mysqlPrisma.$queryRaw<any[]>`SELECT * FROM Comment`;
    log(`Found ${comments.length} comments`);

    if (!isDryRun) {
      for (const c of comments) {
        await pgPrisma.comment.upsert({
          where: { id: c.id },
          create: {
            id: c.id,
            userId: c.userId,
            orderItemId: c.orderItemIds, // was mistakenly plural in MySQL
            rate: c.rate,
            contents: c.contents,
            images: c.iamges, // fix typo
            updatedAt: c.updatedAt ?? new Date(),
          },
          update: {
            rate: c.rate,
            contents: c.contents,
            images: c.iamges,
          },
        });
      }
    }

    console.log('\n✅ Migration complete!');
    if (isDryRun) {
      console.log('This was a dry run. Run without --dry-run to apply changes.');
    }
  } finally {
    await mysqlPrisma.$disconnect();
    await pgPrisma.$disconnect();
  }
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
