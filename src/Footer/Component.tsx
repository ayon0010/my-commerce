import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Facebook, Instagram, Linkedin, Send, Twitter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/navbar/Navbar'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className='w-full flex flex-col'>
      <div className='w-full container bg-primary flex justify-between py-4'>
        <div className='flex items-center gap-2'>
          <Send size={40} strokeWidth={1} />
          <span className='text-2xl'>Sign up to Newsletter</span>
        </div>
        <form className='flex items-center rounded-md border border-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'>
          <input
            className='w-[400px]! bg-white py-3 rounded-l-md px-3 border-none outline-none focus:outline-none focus:ring-0'
            type='text'
            placeholder='yourmail@domain.com'
          />
          <input
            type='submit'
            value='Subscribe'
            className='bg-gray-800 text-white border-none rounded-l-none hover:bg-gray-800 cursor-pointer py-3 px-6 rounded-r-md'
          />
        </form>
      </div>
      <section className='flex items-stretch gap-10 w-full container py-10'>
        <div className='flex flex-col gap-10'>
          <Logo />
          <div className='flex flex-col gap-4'>
            <span className='text-2xl font-bold'>Contact Us</span>
            <span className='text-sm text-gray-500'>+91 9876543210</span>
            <span className='text-sm text-gray-500'>info@example.com</span>
            <span className='text-sm text-gray-500'>123, Main Street, Anytown, USA</span>
            <div className='flex items-center gap-2'>
              <Facebook />
              <Instagram />
              <Twitter />
              <Linkedin />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          {navItems.map(({ link }, i) => {
            return <CMSLink className="text-black" key={i} {...link} />
          })}
        </div>
      </section>
    </footer>
  )
}
