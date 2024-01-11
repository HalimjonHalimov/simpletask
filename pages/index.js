import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Layout } from '@/component'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      Hello world
    </Layout>
  )
}
