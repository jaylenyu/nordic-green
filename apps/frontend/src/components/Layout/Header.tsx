'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, Heart, Package, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/order', label: 'Orders', icon: Package },
];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/Logo.png"
            alt="Nordic Green"
            width={160}
            height={52}
            priority
            unoptimized
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive(href)
                  ? 'text-foreground bg-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop User */}
        <div className="hidden lg:flex items-center gap-3">
          {session?.user ? (
            <>
              <Link
                href="/mypage"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={session.user.image ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {session.user.name?.charAt(0) ?? <User className="w-3 h-3" />}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{session.user.name}님</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-muted-foreground"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signIn()}
              className="text-muted-foreground"
            >
              <LogIn className="w-4 h-4 mr-1.5" />
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 pt-12">
            {session?.user && (
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session.user.image ?? undefined} />
                  <AvatarFallback>{session.user.name?.charAt(0) ?? 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{session.user.name}님</p>
                  <p className="text-xs text-muted-foreground">{session.user.email}</p>
                </div>
              </div>
            )}
            <Separator className="mb-4" />
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className={cn(
                  'flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  pathname === '/'
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                )}
              >
                Home
              </Link>
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    isActive(href)
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </Link>
              ))}
            </nav>
            <Separator className="my-4" />
            {session?.user ? (
              <div className="flex flex-col gap-1">
                <Link
                  href="/mypage"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  마이페이지
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors w-full text-left"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
