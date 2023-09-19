import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRandom = (min: number, max: number) => {
  const randomValue = Math.random() * (max - min) + min;
  return Math.floor(randomValue / 1000) * 1000;
};

const plants = [
  {
    name: `FICUS ELASTICA 피쿠스 엘라스티카`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/ficus-elastica-potted-plant-rubber-plant__0554641_pe659882_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `CHRYSALIDOCARPUS LUTESCENS 아레카 야자`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/chrysalidocarpus-lutescens-potted-plant-areca-palm__67424_pe181267_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `RADERMACHERA 라데르마셰라`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/radermachera-potted-plant-china-doll__0554652_pe659872_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `CHAMAEDOREA ELEGANS 샤마에도레아 엘레간스`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/chamaedorea-elegans-potted-plant-parlour-palm__0902086_pe676658_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `CLUSIA 클루시아`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/clusia-potted-plant-clusia__0899951_pe594584_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `PACHIRA AQUATICA 파시라 아크바티카`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/pachira-aquatica-potted-plant-guinea-chestnut__0554649_pe659870_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `KALANCHOE 칼란쇼에`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/kalanchoe-potted-plant-flaming-katy-assorted__1138991_pe880185_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `SPATHIPHYLLUM 스파팁휠룸`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/spathiphyllum-potted-plant-peace-lily__0554657_pe659875_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `HETEROPANAX CHINENSIS 헤테로파낙스 시넨시스`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/heteropanax-chinensis-potted-plant__0554645_pe659854_s5.jpg?f=s`,
    price: getRandom(50000, 150000),
  },
  {
    name: `SANSEVIERIA 산세비에리아`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/sansevieria-potted-plant-assorted__0554656_pe659874_s5.jpg?f=s`,
    price: getRandom(10000, 150000),
  },
  {
    name: `ZAMIOCULCAS 사미오쿨카스`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/zamioculcas-potted-plant-aroid-palm__67488_pe181328_s5.jpg?f=s`,
    price: getRandom(10000, 150000),
  },
  {
    name: `SANSEVIERIA CYLINDRICA 산세비에리아 쉴린드리카`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 plants입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url: `https://www.ikea.com/kr/ko/images/products/sansevieria-cylindrica-potted-plant-snake-plant__0554653_pe659873_s5.jpg?f=s`,
    price: getRandom(10000, 150000),
  },
];

const vase = [
  {
    name: `KONSTFULL 콘스트풀`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/konstfull-vase-clear-glass-patterned__1079650_pe857633_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `PÅDRAG 포드라그`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/padrag-vase-clear-glass__0941050_pe795311_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `BERÄKNA 베레크나`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/beraekna-vase-clear-glass__0942137_pe796018_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `GRADVIS 그라드비스`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/gradvis-vase-with-metal-insert-clear-glass-gold-colour__1066308_pe852370_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `TIDVATTEN 티드바텐`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/tidvatten-vase-clear-glass__1091046_pe862276_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `SANNOLIK 산놀리크`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/sannolik-vase-pink__0369472_pe551158_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `SMÄLLSPIREA 스멜스피레아`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/smaellspirea-vase-clear-glass-patterned__1147668_pe883394_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `GRADVIS 그라드비스`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/gradvis-vase-blue__1160575_pe888973_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `STILREN 스틸렌`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/stilren-vase-white__0913272_ph162406_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `REKTANGEL 렉탕엘`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/rektangel-vase-clear-glass__0121900_pe212883_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `BEGÄRLIG 베옐리그`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/begaerlig-vase-clear-glass__0367304_pe549496_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `CHILIFRUKT 실리프룩트`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/chilifrukt-vase-watering-can-bright-yellow__1160537_pe888948_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `ÅTGÅNG 오트공`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/atgang-vase-grey__0367311_pe549493_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `TONSÄTTA 톤세타`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/tonsaetta-vase-blue__0759676_pe750499_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `LIVSVERK 리브스베르크`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/livsverk-vase-light-blue-grey__1142319_pe881235_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `SÄLLSKAPLIG 셀스카플리그`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/saellskaplig-jug-patterned-green__0941746_pe795676_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `VASEN 바센`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/vasen-vase-clear-glass__0121988_pe131951_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `FALLENHET 팔렌헤트`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/fallenhet-vase-off-white__1006821_pe825863_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `POMP 폼프`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/pomp-vase-lantern-clear-glass__0902577_pe595250_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `TONSÄTTA 톤세타`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/tonsaetta-vase-grey__0704348_pe725339_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `CYLINDER 쉴린데르`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/cylinder-vase-set-of-3-clear-glass__0638963_pe699297_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `BEGÄRLIG 베옐리그`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/begaerlig-vase-clear-glass__0637227_pe698196_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `LIVSLÅNG 리브슬롱`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/livslang-vase-green__0525006_pe644710_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `PEPPARKORN 페파르코른`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/pepparkorn-vase-grey__0577477_pe668909_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
  {
    name: `RÄFFELBJÖRK 레펠비에르크`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 vase입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url: `https://www.ikea.com/kr/ko/images/products/raeffelbjoerk-vase-mother-of-pearl-colour__1115553_pe872281_s5.jpg?f=s`,
    price: getRandom(50000, 350000),
  },
];

const growingAccessories = [
  {
    name: `TOMAT 토마트`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/tomat-spray-bottle-white__0811097_pe771569_s5.jpg?f=s`,
    price: getRandom(10000, 50000),
  },
  {
    name: `GRÄSMARÖ 그레스마뢰`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/graesmaroe-3-piece-gardening-set-in-outdoor-light-green__1147776_pe883458_s5.jpg?f=s`,
    price: getRandom(10000, 50000),
  },
  {
    name: `ÅKERBÄR 오케르베르`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/akerbaer-greenhouse-in-outdoor-white__1176981_pe895191_s5.jpg?f=s`,
    price: getRandom(100000, 500000),
  },
  {
    name: `SENAPSKÅL 세납스콜`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/senapskal-decoration-greenhouse-in-outdoor-black__0965459_pe809519_s5.jpg?f=s`,
    price: getRandom(100000, 500000),
  },
  {
    name: `BRYTBÖNA 브뤼트뵈나`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/brytboena-herb-scissors-light-green__1147741_pe883433_s5.jpg?f=s`,
    price: getRandom(10000, 50000),
  },
  {
    name: `HYLLIS 휠리스`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/hyllis-shelving-unit-with-cover-transparent__0911732_pe712594_s5.jpg?f=s`,
    price: getRandom(100000, 500000),
  },
  {
    name: `SESAMFRÖN 세삼프뢴`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/sesamfroen-plant-mister-clear-glass__0958896_pe809495_s5.jpg?f=s`,
    price: getRandom(100000, 500000),
  },
  {
    name: `BRYTBÖNA 브뤼트뵈나`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/brytboena-secateurs-light-green__1147745_pe883438_s5.jpg?f=s`,
    price: getRandom(10000, 50000),
  },
  {
    name: `TOMAT 토마트(그린)`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/tomat-spray-bottle-light-green__1147771_pe883455_s5.jpg?f=s`,
    price: getRandom(10000, 50000),
  },
  {
    name: `HYLLIS 휠리스 3단`,
    contents: `{"blocks":[{"key":"142g4","text":"본 제품은 growingAccessories입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cu7s2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url: `https://www.ikea.com/kr/ko/images/products/hyllis-shelving-unit-with-cover-transparent__0661290_pe712587_s5.jpg?f=s`,
    price: getRandom(100000, 500000),
  },
];

const productData: Prisma.productsCreateInput[] = [
  ...plants,
  ...vase,
  ...growingAccessories,
];

async function main() {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
    console.log(`Created id: ${product.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
