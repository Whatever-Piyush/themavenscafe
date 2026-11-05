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
        'Downstairs is for lingering. Upstairs the ovens are running. And there is a rooftop coming — open air above the Pilani Road, the lights of the street below, and sunsets worth staying for.',
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
          copy: 'Cakes, tarts and puddings finished here in small batches — not bought in days old and left to sit.',
        },
      ],
    },

    menuPreview: {
      eyebrow: 'The menu',
      title: 'Burgers, pizza, shakes and more',
      lead: 'Everything made on the premises, every day.',
      cta: 'See the full menu',
    },

    space: {
      eyebrow: 'The space',
      title: 'Two floors open, and a rooftop to come',
      lead: 'Arched niches, fluted walls and warm light at street level, the kitchen above it — and a terrace still to come.',
      cta: 'See the space',
    },

    celebrations: {
      eyebrow: 'Parties and celebrations',
      // Non-breaking spaces, so a line never ends on a stranded "Your".
      title: 'Your\u00a0Celebration. Your\u00a0Theme. Our\u00a0Café.',
      lead: 'Planning a birthday, anniversary, surprise party or a special get\u2011together? Make The Maven’s your celebration destination.',
      // Held together so the line breaks after the comma, not mid-phrase.
      accent: 'More than a cake, make\u00a0it\u00a0a\u00a0whole\u00a0celebration.',
      body: 'Book the whole cafe for your celebration. Not just a customised cake — the entire cafe, set to the theme you want. Tell us what you have in mind, and we will get it done.',
      whatsappCta: 'Book on WhatsApp',
      whatsappMessage: 'Hello, I would like to book The Maven’s for a celebration.',
      callCta: 'Call us',
      /**
       * The photo wheel under the buttons, in order. `id` is a gallery id; the
       * title and note appear over the photo on hover, or on tap on a phone.
       */
      wheel: [
        {
          id: 'balloon-interior',
          title: 'Dressed for a party',
          note: 'Balloons in our maroon and cream, set up for a birthday. Book the cafe and we theme it your way.',
        },
        {
          id: 'festive-entrance',
          title: 'A welcome at the door',
          note: 'A balloon arch around the entrance, so your guests know where the party is.',
        },
        {
          id: 'ground-floor-interior',
          title: 'The ground floor',
          note: 'Cushioned chairs, light wood tables and the gold-lit arch, with the dessert counter by the stairs.',
        },
        {
          id: 'arched-niche-seating',
          title: 'A table for two, in the arch',
          note: 'Our quietest corner, under the botanical mural and a warm cove light.',
        },
        {
          id: 'iced-coffees',
          title: 'Iced coffee',
          note: 'Made to order and served cold, with the cake counter right behind you.',
        },
        {
          id: 'open-door-night',
          title: 'Open into the evening',
          note: 'The staircase, the lights and the counter, seen through the glass after dark.',
        },
        {
          id: 'blade-sign-dusk',
          title: 'Look for the sign',
          note: 'Our round sign lights up at dusk on Pilani Road, so you can find us after dark.',
        },
      ],
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
    comingSoon: 'Coming soon',
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
    lead: 'A café, bakery and dessert room in Chirawa — powered by Pragati Bakery, baking since 1995.',
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
        heading: 'Thirty years of baking behind it',
        body: 'The Maven’s is powered by Pragati Bakery, which has been baking since 1995. The cafe is the new front of a kitchen that has been running for three decades — so what reaches the counter is not a first attempt at anything. It is the same hands, in a room built to sit in.',
      },
      {
        heading: 'Cakes, and why ours are different',
        body: 'Most cakes and pastries sold around here were baked somewhere else, three or four days ago, and have been sitting since. You can taste those days — in dry crumb, in cream that has turned, in a sponge that gives nothing back. Ours are baked upstairs and finished in small batches, which is why we sometimes run out by evening. We would rather hand you something made this morning than something that survived the week. Come to the counter and have it fresh.',
      },
      {
        heading: 'The space',
        body: 'Two floors in use: the counter and the dessert display at street level, the kitchen directly above it, ovens running from before opening. Arched niches, fluted walls, warm light — designed to be sat in for an hour, not photographed and left. A rooftop terrace is planned above it: open air over the Pilani Road, the lights of the street below, sunsets over Chirawa, and match nights under the sky. That one is still an idea, but it is the one we are most impatient about.',
      },
    ],
  },

  contact: {
    title: 'Visit Us',
    lead: 'Come and find us in Chirawa, Rajasthan — powered by Pragati Bakery, baking since 1995.',
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
