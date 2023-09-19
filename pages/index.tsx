import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const Home: NextPage = () => {
  
  const [products, setProducts] = useState<
    { id: string; name: string; createdAt: string }[]
  >([])
  
  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (inputRef.current == null || inputRef.current.value === '') {
      alert('name을 넣어주세요.')
      return
    }
    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message))
  }

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 >
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div>
          <p>Product List</p>
          {products &&
            products.map((item) => (
              <div key={item.id}>
                {item.name}
                <span>{item.createdAt}</span>
              </div>
            ))}
          {/* {products &&
            products.map((item) => (
              <div key={item.id}>
                {JSON.stringify(item)}
                {item.properties &&
                  Object.entries(item.properties).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        fetch(
                          `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`
                        )
                          .then((res) => res.json())
                          .then((data) => alert(JSON.stringify(data.detail)))
                      }}
                    >
                      {key}
                    </button>
                  ))}
                <br />
                <br />
              </div>
            ))} */}
        </div>
      </main>
    </div>
  )
}

export default Home
