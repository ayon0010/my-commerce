// import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import Navbar from '@/components/navbar/Navbar'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <Navbar />
}
