import { cn } from '@/utilities/ui'
import React from 'react'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import RichText from '@/components/RichText'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CarouselBlock } from '@/blocks/Carousel/CarouselBlock'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { FormBlock } from '@/blocks/Form/Component'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, content, size } = col;
            console.log(col);
            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {content &&
                  content.map((block, index) => {
                    if (!block) return null

                    switch (block.blockType) {
                      case 'text':
                        return (
                          <div key={index}>
                            <RichText data={block.richText as any} enableGutter={false} />
                          </div>
                        )
                      case 'mediaBlock':
                        return (
                          <div key={index}>
                            <MediaBlock {...block} enableGutter={false} disableInnerContainer={true} />
                          </div>
                        )
                      case 'carousel':
                        return (
                          <div key={index}>
                            <CarouselBlock
                              slides={block.slides ?? []}
                              autoplay={Boolean(block.autoplay)}
                              delay={block.delay ?? 0}
                            />
                          </div>
                        )
                      case 'cta':
                        return (
                          <div key={index}>
                            <CallToActionBlock {...(block as any)} />
                          </div>
                        )
                      case 'formBlock':
                        return (
                          <div key={index}>
                            <FormBlock {...(block as any)} />
                          </div>
                        )
                      default:
                        return null
                    }
                  })}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
