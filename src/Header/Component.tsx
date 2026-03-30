// import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Category, Header } from '@/payload-types'
import Navbar from '@/components/navbar/Navbar'
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function Header() {
  const payload = await getPayload({ config: configPromise });
  const headerData: Header = await getCachedGlobal('header', 1)();
  const categories = await payload.find({
    collection: 'categories',
  });

  const categoryData = categories.docs as unknown as Category[];

  return <Navbar data={headerData} categories={categoryData} />
}
