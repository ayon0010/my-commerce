import { Block } from "payload";

export const Carousel: Block = {
  slug: "carousel",
  labels: {
    singular: "Carousel",
    plural: "Carousels",
  },
  fields: [
    {
      name: "autoplay",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "delay",
      type: "number",
      defaultValue: 3000,
      admin: {
        condition: (_, siblingData) => siblingData?.autoplay,
      },
    },
    {
      name: "slides",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "buttonText",
          type: "text",
        },
        {
          name: "buttonLink",
          type: "text",
        },
      ],
    },
  ],
};