/**
 * Site copy.
 *
 * Every piece of visible prose lives here so it can be edited without touching
 * a component. The voice is warm, confident and unhurried: short sentences, no
 * exclamation marks, no marketing superlatives.
 *
 * What is NOT here, deliberately: claims the cafe has not made. No awards, no
 * "award-winning", no "best in Rajasthan", no customer quotes, no founding
 * year, no chef biography. Everything below is either drawn from the brand's
 * own materials or describes the craft in general terms that are true of any
 * café that bakes on site — which this one does.
 */

export const copy = {
  home: {
    hero: {
      ctaPrimary: 'View Menu',
      ctaSecondary: 'Visit Us',
      scrollHint: 'Scroll',
    },

    story: {
      eyebrow: 'Our story',
      title: 'A maven is someone who knows. We happen to know coffee.',
      paragraphs: [
        'The ovens come on before the lights do. Bread needs those hours, and there is no shortcut worth taking.',
        'Coffee is pulled to order, never left standing on a hotplate. Cakes are finished in small batches, which means we sometimes run out — we would rather that than sell you something tired.',
        'Downstairs is for lingering. Upstairs is quieter. And the terrace, once the evening turns, is the best seat in the house.',
      ],
      cta: 'More about us',
    },

    craft: {
      eyebrow: 'What we make',
      title: 'Three counters, one kitchen',
      lead: 'Café, bakery and desserts — made here, every day.',
      items: [
        {
          name: 'Café',
          copy: 'Espresso, filter and everything between. Ground to order, pulled to order.',
        },
        {
          name: 'Bakery',
          copy: 'Breads, pastries and savouries, baked through the morning rather than bought in.',
        },
        {
          name: 'Desserts',
          copy: 'Cakes, tarts and puddings finished in small batches and kept properly cold.',
        },
      ],
    },

    menuPreview: {
      eyebrow: 'The menu',
      title: 'Coffee, pastries, cakes and more',
      leadPending: 'The full menu is being finalised. It will be here shortly.',
      lead: 'Everything made on the premises, every day.',
      cta: 'See the full menu',
    },

    space: {
      eyebrow: 'The space',
      title: 'Three floors, one of them open to the sky',
      lead: 'Arched niches, fluted walls and warm light — designed to be sat in, not photographed and left.',
      cta: 'See the space',
    },

    pillars: {
      eyebrow: 'Why The Maven’s',
      title: 'Premium, fresh, handcrafted — always',
      lead: 'Four words from our own counter, and the standard we hold ourselves to.',
      descriptions: {
        Premium: 'Better ingredients, sourced properly, with no substitutions when stock runs short.',
        Fresh: 'Baked the same morning. Nothing carried over from yesterday.',
        Handcrafted: 'Made by hand, in small batches, by people who taste as they go.',
        Always: 'The same standard on a quiet Tuesday as on a full Saturday.',
      } as Record<string, string>,
    },

    visit: {
      eyebrow: 'Visit us',
      title: 'Come and sit down',
      lead: 'We are in Chirawa, Rajasthan.',
      leadPending: 'Full details are on their way. In the meantime, you can find us in Chirawa.',
    },
  },

  menu: {
    title: 'Menu',
    lead: 'Café, bakery and desserts — made on the premises.',
    pendingTitle: 'Our menu is on its way',
    pendingCopy:
      'We are putting the finishing touches to it. Rather than show you something provisional, we would rather show you the real thing — it will be here soon.',
    disclaimer: 'Prices are subject to change. Taxes extra as applicable.',
    searchLabel: 'Search the menu',
    searchPlaceholder: 'Search dishes and drinks',
    allCategories: 'All',
    noResults: 'Nothing matched that search.',
    unavailable: 'Currently unavailable',
  },

  gallery: {
    title: 'The Space',
    lead: 'Arches, warm light and room to linger. A look around Chirawa.',
    pendingTitle: 'Photography coming soon',
    pendingCopy:
      'We are waiting on proper photographs of the finished space rather than publishing anything we do not have the rights to show. Until then, here is the shape of the place in our own hand.',
  },

  about: {
    title: 'Our Story',
    lead: 'A café, bakery and dessert room in Chirawa.',
    sections: [
      {
        heading: 'The name',
        body: 'A maven is someone who knows — the person others ask. It is a high bar to name yourself after, and that is rather the point. It keeps us honest on the mornings when nobody would notice the difference.',
      },
      {
        heading: 'The craft',
        body: 'Baking happens here, in this building, every morning. Coffee is ground to order and pulled to order. Desserts are finished in small batches. None of it is unusual — it is simply what doing it properly looks like, and it is the part most places quietly stop doing.',
      },
      {
        heading: 'The space',
        body: 'Three floors: a counter and dessert display on the ground floor, a quieter room above it, and a terrace on the roof that opens to the sky. Arched niches, fluted walls, warm light. It was designed to be sat in for an hour, not photographed and left.',
      },
    ],
  },

  contact: {
    title: 'Visit Us',
    lead: 'Come and find us in Chirawa, Rajasthan.',
    pendingNotice:
      'We are getting our contact details in order. This page will be filled in shortly — thank you for your patience.',
    labels: {
      address: 'Where',
      hours: 'Hours',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      email: 'Email',
      website: 'Website',
      directions: 'Get directions',
    },
    comingSoon: 'Coming soon',
    /**
     * There is no contact form in V1 and this line says so plainly. A form that
     * silently discards messages is worse than no form, and we have no email
     * service wired up to receive them.
     */
    noFormNote:
      'We do not have an online enquiry form. Calling or messaging us on WhatsApp is the quickest way to reach us — you will get a person rather than a queue.',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'This page is off the menu',
    copy: 'The link may be out of date, or we may have moved things around. The coffee is still where you left it.',
    ctaPrimary: 'Back to home',
    ctaSecondary: 'View the menu',
  },
} as const;
