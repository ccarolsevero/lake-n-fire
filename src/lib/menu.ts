export type MenuItem = {
  name: string;
  price: number | null;
  description?: string;
  note?: string;
  portion?: string;
};

export type MenuCategory = {
  slug: string;
  title: string;
  subtitle?: string;
  channel: "restaurante" | "emporio";
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    slug: "para-compartilhar",
    title: "Para compartilhar",
    subtitle: "Para a mesa, com fogo e afeto.",
    channel: "restaurante",
    items: [
      {
        name: "Pão da casa, manteiga & black rub",
        price: 16,
        description:
          "Duas fatias de pão de fermentação natural tostado na parrilla, com manteiga temperada.",
      },
      {
        name: "Carpaccio, rúcula e parmesão",
        price: 78,
        description:
          "Carpaccio Angus, rúcula, molho de mostarda, croutons e parmesão.",
      },
      {
        name: "Quarteto de pastéis",
        price: 38,
        description:
          "Quatro pastéis: 2 de costela suína defumada e 2 de queijo com geleia de tomate defumado.",
      },
      {
        name: "Pastéis de camarão",
        price: 65,
        description:
          "Cinco pastéis com camarão salteado, queijo cremoso e cebolinha. Acompanha molho picante.",
      },
      {
        name: "Bolinhos de pulled pork",
        price: 52,
        description: "Seis bolinhos de pulled pork com maionese de mostarda.",
      },
      {
        name: "Coxinha de brisket",
        price: 52,
        description: "Quatro coxinhas de brisket finalizadas com neve de parmesão.",
      },
      {
        name: "Poutine",
        price: 78,
        description:
          "Batata fininha, tiras de filé mignon, demiglace da casa, parmesão e ervas.",
      },
      {
        name: "Frango frito Lake",
        price: 79,
        description: "Frango frito com molho barbecue e molho verde.",
      },
      {
        name: "Linguiças artesanais Lake 'n Fire",
        price: 78,
        portion: "aprox. 450g",
        description: "Servidas com vinagrete e limão.",
      },
      {
        name: "Linguiça de costela bovina Angus",
        price: 78,
        portion: "aprox. 500g",
      },
      {
        name: "Camarão da casa",
        price: 78,
        description:
          "Camarão salteado no azeite, alho e salsinha. Servido com pão artesanal.",
      },
      {
        name: "Empanadas artesanais do Lake",
        price: 36,
        description: "Duas empanadas argentinas tradicionais com chimichurri.",
      },
    ],
  },
  {
    slug: "saladas",
    title: "Saladas & entradas",
    channel: "restaurante",
    items: [
      {
        name: "Burrata à moda do Lake",
        price: 98,
        description:
          "Burrata, tomates defumados, azeite de ervas, terra de azeitona e fitas de pepino. Servida com pão de fermentação natural.",
      },
      {
        name: "Salmon Lake Salad",
        price: 80,
        description:
          "Mix de folhas, salmão defumado, cebola roxa, maçã verde, amêndoas tostadas, cranberry e molho Juliana.",
      },
      {
        name: "Salad Bowl",
        price: 36,
        description:
          "Mix de folhas, fitas de cenoura e pepino, tomate cereja e molho especial.",
      },
      {
        name: "Salada de camarão",
        price: 80,
        description:
          "Folhas, camarão salteado, manga, rabanete, tomate cereja, mostarda e mel e balsâmico.",
      },
      {
        name: "Nossa versão de Caesar Salad",
        price: 72,
        description:
          "Alface, frango defumado, molho Caesar, bacon e parmesão.",
      },
    ],
  },
  {
    slug: "parrilla",
    title: "Cortes na parrilla",
    subtitle:
      "Finalizados com fleur de sel e vinagrete de maçã verde.",
    channel: "restaurante",
    items: [
      {
        name: "Short Rib",
        price: 115,
        portion: "aprox. 450g",
        description:
          "Corte do miolo do acém, macio, com sabor intenso e suculento pelo marmoreio.",
      },
      {
        name: "Ribeye",
        price: 138,
        portion: "aprox. 450g",
        description:
          "Também chamado de bife ancho ou entrecôte. Saboroso e macio.",
      },
      {
        name: "Chorizo",
        price: 129,
        portion: "aprox. 450g",
        description:
          "Corte argentino do contrafilé, com a capa de gordura que dá sabor especial. Também conhecido como NY Strip.",
      },
      {
        name: "T-Bone",
        price: 139,
        portion: "aprox. 550g",
        description:
          "Corte com osso em T: filé mignon de um lado e contrafilé do outro.",
      },
      {
        name: "Fraldinha Red",
        price: 138,
        portion: "aprox. 450g",
        description:
          "A famosa fraldinha do churrasco brasileiro. Magra e extremamente saborosa.",
      },
      {
        name: "Flat Iron",
        price: 138,
        portion: "aprox. 450g",
        description: "Do miolo da paleta: incrivelmente macio e marmorizado.",
      },
      {
        name: "Picanha",
        price: 189,
        portion: "aprox. 550g",
        description:
          "A rainha do churrasco, levemente defumada e grelhada na parrilla.",
      },
      {
        name: "Tomahawk suíno",
        price: 98,
        portion: "aprox. 450g",
        description:
          "Lombo Duroc com osso. Levemente defumado e grelhado. Acompanha barbecue artesanal e limão.",
      },
      {
        name: "Carré de cordeiro",
        price: 208,
        portion: "aprox. 500g",
        description:
          "Oito costeletas de cordeiro Dorper VPJ na parrilla. Acompanha chimichurri.",
      },
    ],
  },
  {
    slug: "defumados",
    title: "Defumados no pit smoker",
    subtitle:
      "Low and slow. Acompanha barbecue artesanal, coleslaw e cebola roxa em picles.",
    channel: "restaurante",
    items: [
      {
        name: "Costelinha BBQ",
        price: 128,
        portion: "aprox. 1000g",
        description:
          "Costela suína defumada por seis horas, com rub especial e barbecue artesanal. Contém pimenta.",
      },
      {
        name: "Brisket",
        price: 118,
        portion: "aprox. 400g",
        description:
          "Peito Angus defumado por dez horas. Suculento, macio e cheio de sabor. Contém pimenta.",
      },
      {
        name: "Cupim",
        price: 118,
        portion: "aprox. 400g",
        description:
          "Cupim defumado por cerca de doze horas. Um sabor que surpreende. Contém pimenta.",
      },
      {
        name: "Costela Top Rib",
        price: 98,
        portion: "aprox. 550g",
        description:
          "Costela Angus em corte especial, defumada e grelhada na parrilla. Contém pimenta.",
      },
      {
        name: "Smoked Salmon",
        price: 102,
        portion: "aprox. 400g",
        description:
          "Filé de salmão defumado com glaze. Acompanha brócolis, cenoura e tomates confit.",
      },
      {
        name: "Coxa e sobrecoxa de frango",
        price: 54,
        description:
          "Temperada com rub e defumada. Contém pimenta.",
      },
    ],
  },
  {
    slug: "acompanhamentos",
    title: "Acompanhamentos",
    channel: "restaurante",
    items: [
      {
        name: "Arroz de cupim",
        price: 52,
        portion: "2 pessoas",
        description:
          "Arroz de cupim defumado com creme de abóbora, pétalas de cebola, demiglace e brotos.",
      },
      {
        name: "Biro Biro do Lake",
        price: 46,
        portion: "2 pessoas",
        description: "Arroz branco, batata palha, ervas e legumes.",
      },
      { name: "Arroz branco", price: 18, portion: "1 pessoa" },
      {
        name: "Batatinhas com crosta de parmesão e ervas",
        price: 42,
        description:
          "Batata baby assada com crosta de parmesão, manteiga de ervas e sour cream.",
      },
      {
        name: "Mandioca na manteiga de garrafa",
        price: 32,
        description: "Mandioca cozida finalizada na manteiga de garrafa.",
      },
      {
        name: "Farofa de banana da terra",
        price: 32,
        description: "Farofa com ovos, cebola e banana da terra tostada.",
      },
      {
        name: "Legumes tostados",
        price: 56,
        description: "Legumes da estação na grelha com salsa verde.",
      },
      {
        name: "Batata doce",
        price: 48,
        description: "Batata doce assada com molho de queijo e parmesão gratinado.",
      },
      {
        name: "Maionese de batatas defumadas",
        price: 32,
        description:
          "Batatas defumadas, cebola roxa, ovos cozidos, salsinha e molho verde.",
      },
      {
        name: "Batatas fritas fininhas",
        price: 38,
        description: "Batata palito com molho verde.",
      },
    ],
  },
  {
    slug: "massas",
    title: "Massas",
    channel: "restaurante",
    items: [
      {
        name: "Tagliatelle com berinjela e salsa de tomate defumado",
        price: 58,
        description:
          "Berinjela glazeada, shiitake, molho de tomate defumado e parmesão.",
      },
      {
        name: "Tagliatelle com camarões",
        price: 78,
        description: "Azeite, alho frito, camarões grelhados e salsa verde.",
      },
      {
        name: "Conchiglione com ricota e espinafre",
        price: 68,
        description: "Recheado, molho pomodoro, mussarela e parmesão.",
      },
      {
        name: "Lasanha de cupim",
        price: 68,
        description: "Versão da casa com cupim defumado.",
      },
      {
        name: "Tagliatelle com azeite",
        price: 38,
        description: "Azeite e parmesão.",
      },
      {
        name: "Tagliatelle com molho pomodoro",
        price: 38,
        description: "Molho pomodoro e parmesão ralado.",
      },
    ],
  },
  {
    slug: "sanduiches",
    title: "Sanduíches",
    channel: "restaurante",
    items: [
      {
        name: "Sanduíche de pastrami",
        price: 68,
        description:
          "Pão de fermentação natural, pastrami artesanal da casa finamente fatiado, molho de mostarda e picles de pepino.",
      },
      {
        name: "Crispy Chicken",
        price: 48,
        description:
          "Pão brioche, molho verde, frango frito crocante, alface, tomate e cebola roxa. Acompanha maionese de mostarda.",
      },
      {
        name: "Burger Lake",
        price: 48,
        description:
          "Pão brioche, burger Angus 160g defumado e grelhado, cheddar, bacon artesanal, picles e barbecue. Acompanha molho verde.",
      },
      {
        name: "Burger Salad",
        price: 48,
        description:
          "Pão brioche, burger Angus 160g, queijo prato, alface, tomate, cebola roxa e molho verde. Acompanha maionese de mostarda.",
      },
      {
        name: "Metadinha",
        price: 40,
        description:
          "Pão brioche, burger Angus 160g e queijo prato. O cheese burger cortado ao meio e levado de novo à parrilla.",
      },
    ],
  },
  {
    slug: "sobremesas",
    title: "Para terminar",
    channel: "restaurante",
    items: [
      {
        name: "Yeap",
        price: 32,
        description: "Panelinha com marshmallows e chocolate meio amargo tostadinho.",
      },
      {
        name: "Panqueca de maçã",
        price: 38,
        description:
          "Panqueca com maçã caramelizada e doce de leite. Finalizada na brasa com sorvete de baunilha.",
      },
      {
        name: "Chocolate em texturas",
        price: 38,
        description: "Bolo de chocolate sem farinha, quente, com sorvete de chocolate.",
      },
      {
        name: "Panelinha de sorvete",
        price: 16,
        description: "Sabores: baunilha ou chocolate.",
      },
      { name: "Café Nespresso", price: 9 },
      { name: "Chá", price: 8 },
    ],
  },
  {
    slug: "nao-alcoolicas",
    title: "Não alcoólicas",
    channel: "restaurante",
    items: [
      { name: "Água Platina sem gás", price: 7.8 },
      { name: "Água Platina com gás", price: 7.8 },
      { name: "Coca-Cola", price: 9 },
      { name: "Coca-Cola Zero", price: 9 },
      { name: "Fanta Laranja", price: 9 },
      { name: "Guaraná Antarctica", price: 9 },
      { name: "Guaraná Antarctica Zero", price: 9 },
      { name: "Tônica", price: 9 },
      { name: "Tônica Zero", price: 9 },
      { name: "Soda limonada", price: 9 },
      { name: "Soda limonada Zero", price: 9 },
      { name: "H2O", price: 10, note: "Consulte sabores" },
      { name: "Schweppes Citrus", price: 10 },
      { name: "Red Bull", price: 12 },
    ],
  },
  {
    slug: "sucos",
    title: "Sucos",
    channel: "restaurante",
    items: [
      { name: "Laranja", price: 10 },
      { name: "Limão", price: 10 },
      { name: "Maracujá", price: 10 },
      { name: "Abacaxi com hortelã", price: 10 },
      { name: "Laranja com morango", price: 20 },
    ],
  },
  {
    slug: "drinks-zero",
    title: "Drinks sem álcool",
    channel: "restaurante",
    items: [
      {
        name: "Soda fresca",
        price: 28,
        description: "Xarope de maracujá, suco de laranja e soda limonada.",
      },
      {
        name: "Frutas vermelhas",
        price: 28,
        description: "Redução de frutas vermelhas, mix de limões e albumina.",
      },
      { name: "Soda italiana", price: 28, note: "Consulte sabores" },
    ],
  },
  {
    slug: "cervejas",
    title: "Cervejas & chopp",
    channel: "restaurante",
    items: [
      { name: "Heineken", price: 14 },
      { name: "Heineken Zero", price: 15 },
      { name: "Stella Artois", price: 14 },
      { name: "Stella Artois sem glúten", price: 15 },
      { name: "Corona", price: 15 },
      { name: "Corona Zero", price: 16 },
      { name: "Patagônia", price: 16, note: "Consulte tipos" },
      { name: "Michelob", price: 14 },
      { name: "Blue Moon", price: 24 },
      { name: "Tamaru Pilsen", price: 30, portion: "600 ml" },
      { name: "Tamaru IPA", price: 33, portion: "600 ml" },
      { name: "Chopp Antarctica", price: 15, portion: "350 ml" },
    ],
  },
  {
    slug: "drinks",
    title: "Carta de drinks",
    subtitle: "Autorais e clássicos para a mesa.",
    channel: "restaurante",
    items: [
      { name: "White Aperol", price: 40, description: "Bourbon, Aperol, xarope de hortelã e suco de limão." },
      { name: "Maker's Foam", price: 42, description: "Maker's Mark, suco de limão, suco de laranja, xarope de hortelã e espuma de hibisco com cumaru." },
      { name: "Gold Apple", price: 38, description: "Jim Beam Apple, suco de caju concentrado e xarope de hortelã com cardamomo." },
      { name: "Vodka Splizz", price: 38, description: "Vodka, xarope de hortelã, suco de limão, Aperol e tônica." },
      { name: "Peach on the Beach", price: 42, description: "Vodka, suco de cranberry, suco de laranja e xarope de pêssego." },
      { name: "Mediterrâneo Smoked", price: 42, description: "Gin, suco de limão, xarope de abacaxi defumado com jasmim, Aperol e tônica." },
      { name: "Smash Citric Mint", price: 38, description: "Gin, suco de limão, xarope de hortelã e tônica." },
      { name: "Tropical Rose", price: 38, description: "Gin, xarope tropical e tônica." },
      { name: "Gin Frozen", price: 40, description: "Gin, Aperol, morango, suco de limão e xarope de cereja." },
      { name: "Old Fashioned", price: 45, description: "Bourbon, xarope de açúcar e bitters." },
      { name: "Penicillin", price: 47, description: "Gengibre, bourbon, suco de limão e xarope de açúcar." },
      { name: "Too Soon", price: 38, description: "Gin, Cynar, suco de limão e xarope de açúcar." },
      { name: "Dry Martini", price: 42, description: "Gin e vermute seco." },
      { name: "Negroni", price: 45, description: "Gin, vermute rosso e Campari. Fatia de laranja." },
      { name: "Boulevardier", price: 48, description: "Bourbon, vermute rosso e Campari." },
      { name: "Gin Tônica", price: 38, description: "Gin, suco de limão e tônica." },
      { name: "Aperol Tônica", price: 38, description: "Aperol, suco de limão e tônica." },
      { name: "Rabo de Galo", price: 38, description: "Cachaça, vermute rosso e Cynar." },
    ],
  },
  {
    slug: "vinhos",
    title: "Carta de vinhos",
    subtitle: "Espumantes, brancos, rosés e tintos.",
    channel: "restaurante",
    items: [
      { name: "Chandon Brut", price: 180, portion: "750 ml", description: "Pinot Noir, Riesling, Chardonnay." },
      { name: "Encostas do Minho DOC", price: 98, portion: "750 ml", description: "Arinto, Loureiro, Trajadura, Portugal." },
      { name: "Ceressou Rosé", price: 108, portion: "750 ml", description: "Grenache Noir, Merlot, Syrah, França." },
      { name: "Alorna Portas do Sol", price: 108, portion: "750 ml", description: "Castelão e Trincadeira, Portugal." },
      { name: "EA Cartuxa Tinto", price: 138, portion: "750 ml", description: "Aragonez, Castelão, Syrah, Trincadeira." },
      { name: "Don Luciano Reserva", price: 89, portion: "750 ml", description: "Tempranillo, Espanha." },
      { name: "Alamos Malbec", price: 238, portion: "750 ml", description: "Malbec, Argentina." },
      { name: "Taxa de rolha", price: 70 },
    ],
  },
  {
    slug: "emporio",
    title: "Empório",
    subtitle: "Leve o Lake para casa: molhos, rubs e defumados.",
    channel: "emporio",
    items: [
      {
        name: "Molho barbecue artesanal",
        price: 32,
        portion: "350 ml",
        description: "O barbecue da casa, para costela, burger e parrilla.",
      },
      {
        name: "Black rub Lake",
        price: 28,
        portion: "120 g",
        description: "O rub dos defumados, para carnes e pão da casa.",
      },
      {
        name: "Geleia de tomate defumado",
        price: 26,
        portion: "200 g",
        description: "A mesma geleia dos pastéis de queijo.",
      },
      {
        name: "Molho verde",
        price: 22,
        portion: "200 ml",
        description: "Ervas, alho e azeite. Para batata, sanduíche e grelhados.",
      },
      {
        name: "Chimichurri da casa",
        price: 24,
        portion: "200 g",
        description: "Para empanadas, cordeiro e parrilla.",
      },
      {
        name: "Linguiça artesanal Lake 'n Fire",
        price: 48,
        portion: "aprox. 450g",
        description: "Para levar e grelhar em casa.",
      },
      {
        name: "Bacon artesanal da casa",
        price: 42,
        portion: "200 g",
        description: "O mesmo bacon do Burger Lake.",
      },
      {
        name: "Pastrami fatiado",
        price: 68,
        portion: "250 g",
        description: "Defumado com lenhas frutíferas, pronto para o sanduíche.",
      },
    ],
  },
];

export const RESTAURANT_MENU = MENU.filter((c) => c.channel === "restaurante");
export const EMPORIO_MENU = MENU.filter((c) => c.channel === "emporio");
