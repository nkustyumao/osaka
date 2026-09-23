import { useEffect, useMemo, useState } from "react";
import "./App.css";

const STORAGE_KEY = "osaka-trip-planner-v1";
const SHOPPING_STORAGE_KEY = "osaka-trip-shopping-v1";
const PRETRIP_STORAGE_KEY = "osaka-trip-pretrip-v1";
const NOTES_STORAGE_KEY = "osaka-trip-notes-v1";
const ACCOUNTING_STORAGE_KEY = "osaka-trip-accounting-v1";

const defaultTrip = {
  itinerary: [
    {
      id: "day-1",
      date: "9/27",
      label: "Day 1",
      title: "高雄出發、臨空城、道頓堀",
      items: [
        {
          id: "d1-1",
          time: "06:00-07:00",
          place: "高雄機場報到",
          note: "・護照 / 機票 / 登機證\n・Visit Japan Web QR Code\n・日本 SIM / eSIM",
          transport: "國際線航廈",
        },
        {
          id: "d1-2",
          time: "07:00-10:30",
          place: "高雄（KHH）→ 關西（KIX）",
          note: "托運後準備入境 Visit Japan Web QR Code",
          transport: "航班（飛行約 3.5 小時）",
        },
        {
          id: "d1-3",
          time: "10:30-11:40",
          place: "關西機場",
          note: "預估停留 1 小時（含檢疫、證照查驗、提領行李）",
          transport: "航廈內",
        },
        {
          id: "d1-4",
          time: "11:40-12:00",
          place: "KIX → 臨空城 Rinku-Town",
          note: "出站後步行約 6 分鐘至臨空城 Outlets",
          transport: "南海電鐵 空港急行 或 JR 關空快速（搭乘 1 站，車程約 6 分）",
        },
        {
          id: "d1-5",
          time: "12:00-15:50",
          place: "臨空城 Outlets",
          note: "行李寄放：\n・車站寄物櫃：約 400 - 800 日圓 / 櫃\n・車站人工寄放：約 300 日圓 / 件\n・服務中心：約 800 日圓 / 件\n其他：\n・掃描現場告示牌領取外國人優惠券 QR Code\n・午餐可以考慮 喜神拉麵\n・15:40 務必取行李並返回車站\n・各位訓員注意這裡不要買太多，主力消費請保留在 29 號",
          transport: "步行",
        },
        {
          id: "d1-6",
          time: "15:50-17:00",
          place: "臨空城 → 飯店",
          note: "・電車時間約 40 分鐘\n・轉乘與步行約 10-15 分鐘\n・總計約 55-70 分鐘",
          transport:
            "1. 搭乘「南海電鐵 空港急行」至「天下茶屋站」\n2. 站內轉乘「Osaka Metro 堺筋線」至「日本橋站」\n3. 5 號或 10 號出口步行約 3-5 分鐘抵達飯店",
        },
        {
          id: "d1-7",
          time: "17:00-17:40",
          place: "飯店 Check-in",
          note: "彈性時間可稍坐休息或有特別想逛的可以先去晃晃",
          transport: "無",
        },
        {
          id: "d1-8",
          time: "17:40-20:00",
          place: "附近商圈",
          note: "",
          transport: "飯店出發 → 黑門市場 → 千日前 → 難波 → 戎橋筋 → 道頓堀 → 戎橋（Glico 跑跑人）→ 心齋橋筋",
          links: [{ label: "商圈步行路線", url: "https://maps.app.goo.gl/wm2Cc1evLkJWgoGu7" }],
        },
        {
          id: "d1-9",
          time: "20:00-21:30",
          place: "晚餐：和和鍋 道頓堀",
          note: "主打黑毛和牛、神戶牛涮涮鍋（Shabu-Shabu）與壽喜燒（Sukiyaki）吃到飽，亦有單人定量套餐",
          transport: "步行前往",
          links: [{ label: "和和鍋 道頓堀", url: "https://maps.app.goo.gl/tU71oSgQRfNeu1eg9" }],
        },
        {
          id: "d1-10",
          time: "21:30-",
          place: "宵夜採買 & 自由活動",
          note: "・Don Don Donki 或周邊連鎖藥妝超市\n・結束後步行返回飯店休息",
          transport: "步行前往",
        },
      ],
    },
    {
      id: "day-2",
      date: "9/28",
      label: "Day 2",
      title: "大阪城、新世界、通天閣",
      items: [
        {
          id: "d2-1",
          time: "08:00",
          place: "部隊起床",
          note: "梳洗、著裝、早餐、準備出發",
          transport: "—",
        },
        {
          id: "d2-2",
          time: "09:00-09:25",
          place: "飯店 → 大阪歷史博物館",
          note: "車程＋轉乘步行約 20-25 分鐘",
          transport:
            "1.「日本橋站」搭「Osaka Metro 堺筋線」至「堺筋本町站」\n2. 轉乘「中央線」至「谷町四丁目站」9 號出口",
        },
        {
          id: "d2-3",
          time: "09:30-10:40",
          place: "大阪歷史博物館",
          note: "・09:30 開門\n・使用周遊卡免費參觀常設展",
          transport: "谷町四丁目站出站即達",
        },
        {
          id: "d2-4",
          time: "10:40-11:00",
          place: "步行前往大阪城",
          note: "沿途拍照，步行進入城區",
          transport: "歷史博物館 → 大手門 → 櫻門 → 天守閣",
        },
        {
          id: "d2-5",
          time: "11:00-12:30",
          place: "大阪城天守閣",
          note: "・使用周遊卡免費入場\n・參觀天守閣內部歷史文物（約 60-90 分鐘）\n・頂樓展望台俯瞰市景＋周邊拍照",
          transport: "城區內部步行",
        },
        {
          id: "d2-6",
          time: "12:30-13:40",
          place: "城內用餐",
          note: "MIRAIZA 古蹟建築周邊或公園內餐廳用餐",
          transport: "MIRAIZA OSAKA-JO 周邊",
        },
        {
          id: "d2-7",
          time: "13:40-14:30",
          place: "大阪城公園散步",
          note: "・散步拍照點：護城河、極樂橋、御座船乘船處、梅林公園",
          transport: "園區內散步",
        },
        {
          id: "d2-8",
          time: "14:30-15:00",
          place: "前往大阪城港換票",
          note: "・提早 20-30 分鐘抵達售票處\n・憑周遊卡兌換指定班次乘船票",
          transport: "步行至大阪城港售票處",
        },
        {
          id: "d2-9",
          time: "15:00-16:00",
          place: "Aqua-Liner 水上巴士",
          note: "・巡航時間約 55 分鐘\n・雨天/停航備案：附近晃晃或提前往新世界",
          transport: "大阪城港出發（大阪城港發著，周遊）",
        },
        {
          id: "d2-10",
          time: "16:00-17:00",
          place: "大阪城 → 新世界",
          note: "出站即達新世界商圈與通天閣本通",
          transport: "步行至周邊地鐵站搭乘「Osaka Metro 堺筋線」直達「惠美須町站」3 號出口",
        },
        {
          id: "d2-11",
          time: "17:00-18:30",
          place: "新世界散步＋晚餐",
          note: "・抵達後首要任務：先去通天閣櫃台確認/預約入場時段（周遊卡採時段管制，切勿吃飽才去碰運氣）\n・美食清單：串炸、土手燒（牛筋煮）、大阪燒、章魚燒\n・拍照熱點：通天閣正面視角、新世界巨大招牌街道",
          transport: "徒步步行",
        },
        {
          id: "d2-12",
          time: "19:00-20:00",
          place: "通天閣展望台（彈性）",
          note: "・憑預約時段登頂（一般展望台開放至 21:45，最後入場 21:15）\n・若不想看夜景，可直接改為商圈續逛或提早撤退",
          transport: "步行前往",
        },
        {
          id: "d2-13",
          time: "20:00-21:00",
          place: "返回飯店",
          note: "從 8 號出口出站，步行返回飯店休息",
          transport: "「惠美須町站」搭乘「Osaka Metro 堺筋線」至「日本橋站」",
        },
      ],
    },
    {
      id: "day-3",
      date: "9/29",
      label: "Day 3",
      title: "梅田、空中庭園、燒肉",
      items: [
        {
          id: "d3-1",
          time: "08:30",
          place: "部隊起床",
          note: "盥洗、準備出發",
          transport: "—",
        },
        {
          id: "d3-2",
          time: "09:10-09:40",
          place: "飯店出發 → 梅田",
          note: "總車程＋轉乘步行約 25-30 分鐘",
          transport: "1.「日本橋站」搭「Osaka Metro 千日前線」至「難波站」\n2. 站內轉乘「御堂筋線」至「梅田站」",
        },
        {
          id: "d3-3",
          time: "10:00-10:50",
          place: "大丸梅田店（CYPRIS）",
          note: "・營業時間：10:00-20:00\n・CYPRIS 皮件專櫃",
          transport: "梅田站地下連通道直通大丸梅田店",
          links: [{ label: "大丸梅田店", url: "https://maps.app.goo.gl/cYgPzDTHhjxpEdpQ7" }],
        },
        {
          id: "d3-4",
          time: "10:50-11:00",
          place: "步行至 Grand Front Osaka",
          note: "步行約 5-10 分鐘抵達 Grand Front Osaka 南館",
          transport: "經 JR 大阪站北側天橋或地下通道前往",
        },
        {
          id: "d3-5",
          time: "11:00-12:00",
          place: "YONEX SHOWROOM / 自由活動",
          note: "・YONEX SHOWROOM Maps\n・自由活動",
          transport: "Grand Front Osaka 南館 B1F",
        },
        {
          id: "d3-6",
          time: "12:00-13:30",
          place: "午餐：梅田周邊商場",
          note: "・LINKS UMEDA 美食街、阪急三番街、Grand Front 餐廳街",
          transport: "步行前往鄰近商場",
        },
        {
          id: "d3-7",
          time: "13:30-17:00",
          place: "梅田商圈自由活動",
          note: "・自由購物（LUCUA、阪急、阪神、友都八喜 Yodobashi 等）",
          transport: "梅田站周邊各大百貨與地下街",
        },
        {
          id: "d3-8",
          time: "17:00-18:00",
          place: "HEP FIVE 摩天輪（彈性）",
          note: "・若天氣不錯，可直接將此段保留給空中庭園提早卡位",
          transport: "步行前往 HEP FIVE（7F 搭乘處）",
        },
        {
          id: "d3-9",
          time: "18:00-19:00",
          place: "梅田藍天大廈／空中庭園展望台",
          note: "・日落卡位：務必確認當天日落時刻，建議日落前 30-45 分鐘抵達頂樓有夕陽轉夜景\n・票務備忘：非 2 日連續周遊卡者現場或線上直接購買入場即可",
          transport: "步行經地下通前往梅田藍天大廈（約 10-15 分鐘）",
        },
        {
          id: "d3-10",
          time: "19:00-21:00",
          place: "YAKINIKUEN 忍鬨大阪梅田店",
          note: "大阪近年在社群與觀光客圈極具代表性的單點制黑毛和牛燒肉店，以「厚切蔥包牛舌」為核心招牌",
          transport: "步行前往燒肉店（預留 10-15 分鐘路程與找店）",
          links: [{ label: "YAKINIKUEN 忍鬨 大阪梅田店", url: "https://maps.app.goo.gl/L26RuLubYY2jyFD97" }],
        },
        {
          id: "d3-11",
          time: "21:00-21:40",
          place: "返回飯店",
          note: "回飯店休息、整理戰利品",
          transport: "1.「梅田站」搭乘「Osaka Metro 御堂筋線」至「難波站」\n2. 轉乘「千日前線」至「日本橋站」出站",
        },
      ],
    },
    {
      id: "day-4",
      date: "9/30",
      label: "Day 4",
      title: "京都、清水寺、伏見稻荷",
      items: [
        {
          id: "d4-1",
          time: "06:45-07:40",
          place: "部隊起床 & 出門準備",
          note: "・06:45 起床盥洗\n・07:05 早餐\n・07:30 行李/隨身包包整理完畢\n・07:40 前離開飯店",
          transport: "—",
        },
        {
          id: "d4-2",
          time: "07:40-08:10",
          place: "前往一日遊集合點",
          note: "步行至「日本橋 / 近鐵日本橋站」2 號出口周邊",
          transport: "步行前往",
        },
        {
          id: "d4-3",
          time: "08:10-08:30",
          place: "抵達集合點 & 報到",
          note: "・08:10 提前抵達預留找路\n・08:25 正式集合報到",
          transport: "集合地點現場等候",
        },
        {
          id: "d4-4",
          time: "08:30-10:30",
          place: "大阪 → 京都",
          note: "車程約 2 小時，車上補眠或確認京都景點路線",
          transport: "專車接駁巴士",
        },
        {
          id: "d4-5",
          time: "10:30-12:00",
          place: "金閣寺（鹿苑寺）",
          note: "・停留約 1.5 小時",
          transport: "園區內步行",
        },
        {
          id: "d4-6",
          time: "12:00-12:20",
          place: "金閣寺 → 清水寺",
          note: "車程約 20 分鐘",
          transport: "專車接駁巴士",
        },
        {
          id: "d4-7",
          time: "12:20-15:20",
          place: "清水寺周邊（午餐＋老街）",
          note: "・停留時間共約 3 小時\n・參觀清水舞台與音羽瀑布祈願\n・於老街沿途享用午餐、京都特色小吃、茶屋休息\n・注意集合時間與巴士停靠點位置，預留 10-15 分鐘回程步行緩衝",
          transport: "街區步行動線：\n清水寺 → 音羽瀑布 → 清水坂 → 三年坂（產寧坂）→ 二年坂",
        },
        {
          id: "d4-8",
          time: "15:20-15:40",
          place: "清水寺 → 伏見稻荷大社",
          note: "車程約 20 分鐘",
          transport: "專車接駁巴士",
        },
        {
          id: "d4-9",
          time: "15:40-16:40",
          place: "伏見稻荷大社",
          note: "・停留時間僅約 1 小時，切勿深爬稻荷山\n・重點鎖定千本鳥居拍照與奧社奉拜所，拍完即依原路折返乘車處",
          transport: "步行動線：\n本殿 → 千本鳥居 → 奧社奉拜所（狐狸繪馬）→ 迴遠原路折返",
        },
        {
          id: "d4-10",
          time: "16:50-18:30",
          place: "京都 → 大阪",
          note: "車程約 1.5 小時，返回大阪市區解散",
          transport: "專車接駁巴士",
        },
        {
          id: "d4-11",
          time: "18:30-21:00",
          place: "難波商圈晚餐 & 自由活動",
          note: "・晚餐推薦：燒肉、居酒屋、大阪燒、串炸\n・飯後於難波街區散步採買，隨後步行返回日本橋飯店休息",
          transport: "難波 / 裏難波商圈步行",
        },
      ],
    },
    {
      id: "day-5",
      date: "10/1",
      label: "Day 5",
      title: "伊根、天橋立",
      items: [
        {
          id: "d5-1",
          time: "06:15-07:15",
          place: "部隊起床 & 出發準備",
          note: "・06:15 起床盥洗\n・06:35 早餐\n・07:00 行李/隨身裝備整理完成\n・07:15 準時踏出飯店",
          transport: "—",
        },
        {
          id: "d5-2",
          time: "07:15-07:50",
          place: "前往集合點 & 巴士報到",
          note: "・集合地點：「近鐵日本橋站」2 號出口附近\n・07:30 抵達集合現場\n・07:45 正式點名報到\n・07:50 專車準時發車",
          transport: "步行前往",
        },
        {
          id: "d5-3",
          time: "07:50-11:20",
          place: "大阪 → 京都府北部",
          note: "・車程約 3.5 小時\n・中途停靠休息站上洗手間與補給，車上補眠",
          transport: "專車接駁巴士",
        },
        {
          id: "d5-4",
          time: "11:20-13:30",
          place: "伊根舟屋（伊根灣巡航與老街）",
          note: "・停留約 2 小時 10 分鐘\n・參觀傳統水上舟屋聚落、漁村老街漫步\n・搭乘伊根灣遊覽船（甲板餵食海鳥與老鷹，海上遠眺舟屋群）",
          transport: "專車抵達後步行 / 搭船",
        },
        {
          id: "d5-5",
          time: "13:30-14:10",
          place: "伊根 → 天橋立",
          note: "車程約 40 分鐘",
          transport: "專車接駁巴士",
        },
        {
          id: "d5-6",
          time: "14:10-16:00",
          place: "日本三景：天橋立",
          note: "・停留時間僅約 2 小時，務必遵守優先順序：\n1. 先搭吊椅/纜車直攻飛龍觀展望台\n2. 站上觀景台完成「胯下觀看（股のぞき）」經典視角拍照\n3. 展望拍完後再視剩餘時間逛伴手禮店（不建議一到就先逛商店）",
          transport: "纜車 / 單人登山吊椅（前往飛龍觀）",
        },
        {
          id: "d5-7",
          time: "16:10-18:30",
          place: "天橋立 → 大阪市區",
          note: "車程約 2.5 小時，返回大阪市區解散",
          transport: "專車接駁巴士",
        },
        {
          id: "d5-8",
          time: "18:30-21:00",
          place: "最後一夜採買 & 晚餐",
          note: "・晚餐推薦：難波拉麵街（一蘭、金龍、無鐵砲等）或周邊餐廳\n・最後衝刺：補齊所有藥妝、美妝、食品與伴手禮",
          transport: "難波 / 道頓堀商圈步行",
        },
        {
          id: "d5-9",
          time: "21:00-",
          place: "回飯店行李打包 & 檢查",
          note: "最後整理",
          transport: "飯店內",
        },
      ],
    },
    {
      id: "day-6",
      date: "10/2",
      label: "Day 6",
      title: "回去當社畜",
      items: [
        {
          id: "d6-1",
          time: "06:45-07:00",
          place: "起床盥洗",
          note: "梳洗、確認隨身貴重物品（護照、錢包、手機）在身",
          transport: "—",
        },
        {
          id: "d6-2",
          time: "07:00-07:30",
          place: "早餐 & 最終打包確認",
          note: "・快速享用早餐\n・行李最後封箱（再次確認行動電源在隨身包、100ml 以上液體在托運行李）",
          transport: "飯店內",
        },
        {
          id: "d6-3",
          time: "07:30-08:00",
          place: "飯店 Check-out & 出發",
          note: "・辦理退房手續\n・拖行李步行約 15 分鐘至「南海 難波站」",
          transport: "步行前往南海難波站",
        },
        {
          id: "d6-4",
          time: "08:00-09:10",
          place: "南海難波 → 關西機場（KIX）",
          note: "・班次選擇：\n1. 特急 Rapit：全車指定席，車程約 38 分鐘（需加購特急券）\n2. 空港急行：一般通勤電車，車程約 44 分鐘（刷 ICOCA 即可）\n・預計 09:00 前後抵達關西機場站",
          transport: "搭乘「南海電鐵」直達「關西機場站」",
        },
        {
          id: "d6-5",
          time: "09:15-11:20",
          place: "關西機場出境手續 & 免稅採買",
          note: "・起飛前 2.5-3 小時抵達，預留充裕安檢時間\n・辦理報到、托運行李、出境審查\n・出境後巡視免稅店（補齊生巧、伴手禮零食）\n・11:20 前抵達登機門候機",
          transport: "國際線航廈",
        },
        {
          id: "d6-6",
          time: "12:00-14:30",
          place: "關西（KIX）→ 高雄（KHH）",
          note: "・日本時間 12:00 起飛，台灣時間 14:30 抵達小港機場\n・入境提領行李、返家整頓，準備收心回歸工作",
          transport: "航班（飛行約 3.5 小時，含 1 小時時差）",
        },
      ],
    },
  ],
  shopping: [],
};

const travelInfo = {
  hotel: {
    name: "ESLEAD HOTEL NAMBA KUROMON",
    chineseName: "艾思利德酒店 難波黑門",
    guest: "I PING WENG",
    phone: "080-3259-3409",
    inquiryTime: "9:00-22:00",
    email: "namba-kuromon@eslead-hotel.com",
    address: "〒542-0072 3-8-29 Kozu Chuo-ku, Osaka-shi, Osaka",
    doorCode: "6891＊",
    note: "入住前一天通常會以電子郵件寄送入館方法說明。為了縮短入住手續，請優先確認信箱並完成必要資料登錄。",
    link: "https://maps.app.goo.gl/6g3aKPsfxgDnEWAy9",
  },
  flights: [
    {
      id: "flight-outbound",
      label: "去程",
      flight: "BR182",
      from: "高雄 KHH",
      fromDetail: "KAOHSIUNG INTL / Terminal I",
      to: "大阪 KIX",
      toDetail: "OSAKA KANSAI INTERNATIONAL / Terminal 1",
      departure: "2026/9/27 07:05",
      arrival: "2026/9/27 11:10",
      class: "W",
      baggage: "1PC",
      operator: "EVA AIR",
      duration: "03:05",
      status: "OK",
    },
    {
      id: "flight-return",
      label: "回程",
      flight: "BR181",
      from: "大阪 KIX",
      fromDetail: "OSAKA KANSAI INTERNATIONAL / Terminal 1",
      to: "高雄 KHH",
      toDetail: "KAOHSIUNG INTL / Terminal I",
      departure: "2026/10/2 12:10",
      arrival: "2026/10/2 14:30",
      class: "V",
      baggage: "1PC",
      operator: "EVA AIR",
      duration: "03:20",
      status: "OK",
    },
  ],
};

const pretripChecklist = {
  must: [
    { id: "passport", text: "護照" },
    { id: "photo", text: "2寸照片*2張（護照不見可以補辦）" },
    { id: "boarding-info", text: "機票 / 登機資料" },
    { id: "visit-japan-web", text: "Visit Japan Web QR Code" },
    { id: "sim", text: "日本 eSIM / SIM" },
    { id: "wallet-card", text: "信用卡" },
    { id: "jpy-cash", text: "日幣" },
    { id: "tw-cash", text: "台幣" },
    { id: "icoca", text: "ICOCA / 交通卡" },
    { id: "hotel-info", text: "住宿資料 / 開鎖號碼" },
    { id: "power-bank", text: "行動電源 記得用夾鏈袋裝起來" },
    { id: "charger", text: "充電線 / 充電頭 可託運" },
    { id: "medicine", text: "常備藥 / 個人藥品" },
    { id: "insurance", text: "旅遊保險資料" },
    { id: "earphones", text: "耳機 有電池請隨身" },
    { id: "mask", text: "口罩" },
    { id: "mask2", text: "個人衛生物品" },
  ],
  suggested: [
    { id: "umbrella", text: "雨傘或輕便雨衣" },
    { id: "tissue", text: "濕紙巾 / 面紙" },
    { id: "shopping-bag", text: "購物袋 " },
    { id: "luggage-scale", text: "行李秤" },
    { id: "coin-pouch", text: "小零錢包" },
    { id: "adapter", text: "轉接頭 / 延長線" },
    { id: "backup-glasses", text: "備用眼鏡 / 隱形眼鏡用品" },
    { id: "shopping-screenshot", text: "清單截圖" },
    { id: "document-copy", text: "護照影本 / 重要資料截圖" },
    { id: "slippers", text: "拖鞋" },
    { id: "razor", text: "刮鬍刀" },
  ],
};

const pretripItems = [...pretripChecklist.must, ...pretripChecklist.suggested];

const TRIP_YEAR = 2026;

function getInitialShopping() {
  try {
    const saved = localStorage.getItem(SHOPPING_STORAGE_KEY);
    if (saved) return JSON.parse(saved);

    const legacySaved = localStorage.getItem(STORAGE_KEY);
    if (!legacySaved) return defaultTrip.shopping;

    const legacyTrip = JSON.parse(legacySaved);
    return legacyTrip.shopping ?? defaultTrip.shopping;
  } catch {
    return defaultTrip.shopping;
  }
}

function getInitialPretripStatus() {
  try {
    const saved = localStorage.getItem(PRETRIP_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function getInitialNotes() {
  try {
    const saved = localStorage.getItem(NOTES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function getInitialAccounting() {
  try {
    const saved = localStorage.getItem(ACCOUNTING_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { totalJpy: "", expenses: [] };
  } catch {
    return { totalJpy: "", expenses: [] };
  }
}

function makeId(prefix) {
  return `${prefix}-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
}

function sanitizeYenInput(value) {
  return String(value ?? "").replace(/[^\d]/g, "");
}

function toYenNumber(value) {
  const numeric = Number(sanitizeYenInput(value));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatYen(value) {
  return `¥${new Intl.NumberFormat("ja-JP").format(value)}`;
}

function getSafeLinkHref(link) {
  const trimmed = link?.trim();
  if (!trimmed) return "";

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

const formatHeaderTime = (date) =>
  date.toLocaleTimeString("zh-TW", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

function getTripDate(day) {
  const [month, date] = day.date.split("/").map(Number);
  return new Date(TRIP_YEAR, month - 1, date);
}

function compareLocalDate(left, right) {
  const leftDate = new Date(left.getFullYear(), left.getMonth(), left.getDate()).getTime();
  const rightDate = new Date(right.getFullYear(), right.getMonth(), right.getDate()).getTime();
  return Math.sign(leftDate - rightDate);
}

function parseClockToMinutes(value) {
  const match = value?.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;

  return Number(match[1]) * 60 + Number(match[2]);
}

function getItemStartMinutes(item) {
  return parseClockToMinutes(item.time);
}

function getItemEndMinutes(item, itemIndex, items) {
  const endMatch = item.time.match(/[-–—]\s*(\d{1,2}):(\d{2})/);
  if (endMatch) return Number(endMatch[1]) * 60 + Number(endMatch[2]);

  const nextStart = getItemStartMinutes(items[itemIndex + 1]);
  if (nextStart !== null) return nextStart;

  return 24 * 60;
}

function getProgressStatus(day, item, itemIndex, items, now) {
  const tripDate = getTripDate(day);
  const dateCompare = compareLocalDate(now, tripDate);
  if (dateCompare < 0) return "upcoming";
  if (dateCompare > 0) return "done";

  const startMinutes = getItemStartMinutes(item);
  if (startMinutes === null) return "upcoming";

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const endMinutes = getItemEndMinutes(item, itemIndex, items);
  if (currentMinutes < startMinutes) return "upcoming";
  if (currentMinutes >= endMinutes) return "done";
  return "current";
}

function getDayProgress(day, now) {
  const tripDate = getTripDate(day);
  const dateCompare = compareLocalDate(now, tripDate);
  const statuses = day.items.map((item, index) => getProgressStatus(day, item, index, day.items, now));
  const currentIndex = statuses.indexOf("current");

  if (dateCompare < 0) {
    return {
      className: "upcoming",
      label: `${day.date} 尚未開始`,
      text: "當天會依時間自動標示目前行程",
      statuses,
    };
  }

  if (dateCompare > 0) {
    return {
      className: "done",
      label: `${day.date} 已完成`,
      text: `共 ${day.items.length} 段行程`,
      statuses,
    };
  }

  if (currentIndex >= 0) {
    return {
      className: "current",
      label: `現在 ${formatHeaderTime(now)}`,
      text: `目前：${day.items[currentIndex].place}`,
      statuses,
    };
  }

  const doneCount = statuses.filter((status) => status === "done").length;
  if (doneCount === day.items.length) {
    return {
      className: "done",
      label: "今日行程已結束",
      text: "可以回飯店整理戰利品了",
      statuses,
    };
  }

  return {
    className: "upcoming",
    label: "今日行程尚未開始",
    text: "時間到後會自動標示目前行程",
    statuses,
  };
}

function App() {
  const [shopping, setShopping] = useState(getInitialShopping);
  const [pretripStatus, setPretripStatus] = useState(getInitialPretripStatus);
  const [notes, setNotes] = useState(getInitialNotes);
  const [accounting, setAccounting] = useState(getInitialAccounting);
  const [page, setPage] = useState("itinerary");
  const [activeDay, setActiveDay] = useState(defaultTrip.itinerary[0].id);
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [newNote, setNewNote] = useState({ title: "", link: "", content: "" });
  const [newExpense, setNewExpense] = useState({ title: "", amount: "", method: "cash" });
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    localStorage.setItem(SHOPPING_STORAGE_KEY, JSON.stringify(shopping));
  }, [shopping]);

  useEffect(() => {
    localStorage.setItem(PRETRIP_STORAGE_KEY, JSON.stringify(pretripStatus));
  }, [pretripStatus]);

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(ACCOUNTING_STORAGE_KEY, JSON.stringify(accounting));
  }, [accounting]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return undefined;

    const lifecycle = new AbortController();
    const register = (tool) => {
      try {
        void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});
      } catch {
        // WebMCP is optional; the visible app remains the source of truth.
      }
    };

    register({
      name: "add_shopping_item",
      title: "Add shopping item",
      description: "Add one item to the Japan trip shopping checklist.",
      inputSchema: {
        type: "object",
        properties: { text: { type: "string", minLength: 1 } },
        required: ["text"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const text = input?.text?.trim();
        if (!text) throw new Error("text is required");

        const item = { id: makeId("shop"), text, done: false };
        setShopping((current) => [item, ...current]);
        return { item };
      },
    });

    register({
      name: "set_pretrip_item_checked",
      title: "Set pre-trip checklist item",
      description: "Mark one pre-trip checklist item as checked or unchecked.",
      inputSchema: {
        type: "object",
        properties: {
          itemId: { type: "string", enum: pretripItems.map((item) => item.id) },
          checked: { type: "boolean" },
        },
        required: ["itemId", "checked"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const item = pretripItems.find((entry) => entry.id === input?.itemId);
        if (!item) throw new Error("itemId is invalid");

        const checked = Boolean(input.checked);
        setPretripStatus((current) => ({ ...current, [item.id]: checked }));
        return { itemId: item.id, checked };
      },
    });

    register({
      name: "add_personal_note",
      title: "Add personal note",
      description: "Add one personal travel note with optional link and content.",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string", minLength: 1 },
          link: { type: "string" },
          content: { type: "string" },
        },
        required: ["title"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const title = input?.title?.trim();
        if (!title) throw new Error("title is required");

        const note = {
          id: makeId("note"),
          title,
          link: input?.link?.trim() ?? "",
          content: input?.content?.trim() ?? "",
          createdAt: new Date().toISOString(),
        };
        setNotes((current) => [note, ...current]);
        return { note };
      },
    });

    register({
      name: "set_total_jpy",
      title: "Set total JPY cash",
      description: "Set the total cash amount in Japanese yen for the trip accounting page.",
      inputSchema: {
        type: "object",
        properties: {
          totalJpy: { type: "number", minimum: 0 },
        },
        required: ["totalJpy"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const totalJpy = Math.max(0, Math.floor(Number(input?.totalJpy) || 0));
        setAccounting((current) => ({ ...current, totalJpy: String(totalJpy) }));
        return { totalJpy };
      },
    });

    register({
      name: "add_expense",
      title: "Add expense",
      description: "Add one Japan trip expense as cash or card.",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string", minLength: 1 },
          amount: { type: "number", minimum: 1 },
          method: { type: "string", enum: ["cash", "card"] },
        },
        required: ["title", "amount", "method"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const title = input?.title?.trim();
        const amount = Math.max(0, Math.floor(Number(input?.amount) || 0));
        const method = input?.method === "card" ? "card" : "cash";
        if (!title) throw new Error("title is required");
        if (amount <= 0) throw new Error("amount must be greater than 0");

        const expense = {
          id: makeId("expense"),
          title,
          amount,
          method,
          createdAt: new Date().toISOString(),
        };
        setAccounting((current) => ({ ...current, expenses: [expense, ...(current.expenses ?? [])] }));
        return { expense };
      },
    });

    return () => lifecycle.abort();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  const currentDay = useMemo(
    () => defaultTrip.itinerary.find((day) => day.id === activeDay) ?? defaultTrip.itinerary[0],
    [activeDay],
  );

  const progressInfo = useMemo(() => getDayProgress(currentDay, now), [currentDay, now]);

  function addShoppingItem(event) {
    event.preventDefault();
    const text = newShoppingItem.trim();
    if (!text) return;

    setShopping((current) => [{ id: makeId("shop"), text, done: false }, ...current]);
    setNewShoppingItem("");
  }

  function toggleShoppingItem(itemId) {
    setShopping((current) => current.map((item) => (item.id === itemId ? { ...item, done: !item.done } : item)));
  }

  function removeShoppingItem(itemId) {
    setShopping((current) => current.filter((item) => item.id !== itemId));
  }

  function updateNewNote(field, value) {
    setNewNote((current) => ({ ...current, [field]: value }));
  }

  function addNote(event) {
    event.preventDefault();
    const title = newNote.title.trim();
    const link = newNote.link.trim();
    const content = newNote.content.trim();
    if (!title && !link && !content) return;

    setNotes((current) => [
      {
        id: makeId("note"),
        title: title || "未命名筆記",
        link,
        content,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setNewNote({ title: "", link: "", content: "" });
  }

  function removeNote(noteId) {
    setNotes((current) => current.filter((note) => note.id !== noteId));
  }

  function updateTotalJpy(value) {
    setAccounting((current) => ({ ...current, totalJpy: sanitizeYenInput(value) }));
  }

  function updateNewExpense(field, value) {
    setNewExpense((current) => ({ ...current, [field]: field === "amount" ? sanitizeYenInput(value) : value }));
  }

  function addExpense(event) {
    event.preventDefault();
    const title = newExpense.title.trim();
    const amount = toYenNumber(newExpense.amount);
    if (!title && amount <= 0) return;
    if (amount <= 0) return;

    const expense = {
      id: makeId("expense"),
      title: title || "未命名花費",
      amount,
      method: newExpense.method === "card" ? "card" : "cash",
      createdAt: new Date().toISOString(),
    };

    setAccounting((current) => ({ ...current, expenses: [expense, ...(current.expenses ?? [])] }));
    setNewExpense({ title: "", amount: "", method: "cash" });
  }

  function removeExpense(expenseId) {
    setAccounting((current) => ({
      ...current,
      expenses: (current.expenses ?? []).filter((expense) => expense.id !== expenseId),
    }));
  }

  const remainingShopping = shopping.filter((item) => !item.done).length;
  const mustRemaining = pretripChecklist.must.filter((item) => !pretripStatus[item.id]).length;
  const suggestedRemaining = pretripChecklist.suggested.filter((item) => !pretripStatus[item.id]).length;
  const remainingPretrip = mustRemaining + suggestedRemaining;
  const expenses = accounting.expenses ?? [];
  const totalJpy = toYenNumber(accounting.totalJpy);
  const cashSpent = expenses
    .filter((expense) => expense.method === "cash")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const cardSpent = expenses
    .filter((expense) => expense.method === "card")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const totalSpent = cashSpent + cardSpent;
  const remainingJpy = totalJpy - cashSpent;

  function togglePretripItem(itemId) {
    setPretripStatus((current) => ({ ...current, [itemId]: !current[itemId] }));
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Japan 9/27 - 10/2</p>
          <h1>大阪京都鐵支團</h1>
          <time style={{ fontSize: "1.2em", color: "black", font: "bold" }}>{formatHeaderTime(now)}</time>
        </div>
      </header>

      <nav className="page-tabs" aria-label="主要頁面">
        <button type="button" className={page === "itinerary" ? "active" : ""} onClick={() => setPage("itinerary")}>
          行程規劃
        </button>
        <button type="button" className={page === "travel" ? "active" : ""} onClick={() => setPage("travel")}>
          住宿機票
        </button>
        <button type="button" className={page === "shopping" ? "active" : ""} onClick={() => setPage("shopping")}>
          購買清單
          <span>{remainingShopping}</span>
        </button>
        <button type="button" className={page === "pretrip" ? "active" : ""} onClick={() => setPage("pretrip")}>
          行前確認
          <span>{remainingPretrip}</span>
        </button>
        <button type="button" className={page === "notes" ? "active" : ""} onClick={() => setPage("notes")}>
          個人筆記
          <span>{notes.length}</span>
        </button>
        <button type="button" className={page === "accounting" ? "active" : ""} onClick={() => setPage("accounting")}>
          簡易記帳
          <span>{expenses.length}</span>
        </button>
      </nav>

      {page === "itinerary" && (
        <section className="panel" aria-labelledby="itinerary-title">
          <div className="section-heading">
            <div>
              <h2 id="itinerary-title">每日行程</h2>
            </div>
          </div>

          <div className="day-tabs" aria-label="每日切換">
            {defaultTrip.itinerary.map((day) => (
              <button
                type="button"
                key={day.id}
                className={day.id === currentDay.id ? "active" : ""}
                onClick={() => setActiveDay(day.id)}
              >
                <strong>{day.date}</strong>
                <small>{day.label}</small>
              </button>
            ))}
          </div>

          <div className="day-title">
            <div>
              <p>{currentDay.label}</p>
              <h3>
                {currentDay.date} {currentDay.title}
              </h3>
            </div>
            <span>{currentDay.items.length} 段行程</span>
          </div>

          <div className={`progress-preview ${progressInfo.className}`}>
            <span>{progressInfo.label}</span>
            <strong>{progressInfo.text}</strong>
          </div>

          <ol className="timeline">
            {currentDay.items.map((item, index) => {
              const progressStatus = progressInfo.statuses[index] ?? "upcoming";

              return (
                <li key={item.id} className={`timeline-item ${progressStatus}`}>
                  <div className="time-rail">
                    <time className="time">{item.time}</time>
                    <span className="time-dot">{index + 1}</span>
                  </div>

                  <div className="timeline-content">
                    <article className="plan-card">
                      <div className="plan-card-header">
                        <div className="plan-title">
                          <h4>{item.place}</h4>
                          {progressStatus === "current" && <span className="now-badge">現在</span>}
                        </div>
                        <span className="more-dots" aria-hidden="true">
                          •••
                        </span>
                      </div>
                      {item.note && (
                        <div className="note-block">
                          {/* <span className="block-label">重點</span> */}
                          <p>{item.note}</p>
                        </div>
                      )}
                      {item.links?.length > 0 && (
                        <div className="plan-links" aria-label="相關連結">
                          {item.links.map((link) => (
                            <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </article>

                    {item.transport && (
                      <div className="transport">
                        <span className="route-icon" aria-hidden="true">
                          →
                        </span>
                        <div>
                          <span className="block-label">交通 / 路線</span>
                          <p>{item.transport}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {page === "travel" && (
        <section className="panel" aria-labelledby="travel-title">
          <div className="section-heading">
            <div>
              <h2 id="travel-title">住宿機票</h2>
            </div>
          </div>

          <div className="info-stack">
            <article className="info-card">
              <div className="card-kicker">住宿</div>
              <h3>{travelInfo.hotel.name}</h3>
              <p className="muted">{travelInfo.hotel.chineseName}</p>
              <a href={travelInfo.hotel.link} target="_blank" rel="noreferrer">
                Google Maps
              </a>
              <dl className="detail-grid">
                <div>
                  <dt>訂房人</dt>
                  <dd>{travelInfo.hotel.guest}</dd>
                </div>
                <div>
                  <dt>開鎖號碼</dt>
                  <dd>{travelInfo.hotel.doorCode}</dd>
                </div>
                <div>
                  <dt>電話</dt>
                  <dd>
                    <a href={`tel:${travelInfo.hotel.phone}`}>{travelInfo.hotel.phone}</a>
                    <span>詢問時間 {travelInfo.hotel.inquiryTime}</span>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${travelInfo.hotel.email}`}>{travelInfo.hotel.email}</a>
                  </dd>
                </div>
                <div className="wide-detail">
                  <dt>地址</dt>
                  <dd>{travelInfo.hotel.address}</dd>
                </div>
              </dl>

              <p className="notice-text">{travelInfo.hotel.note}</p>
            </article>

            <div className="flight-list">
              {travelInfo.flights.map((flight) => (
                <article className="flight-card" key={flight.id}>
                  <div className="flight-topline">
                    <span>{flight.label}</span>
                    <strong>{flight.flight}</strong>
                  </div>

                  <div className="route-row">
                    <div>
                      <strong>{flight.from}</strong>
                      <span>{flight.fromDetail}</span>
                    </div>
                    <div className="route-arrow" aria-hidden="true">
                      →
                    </div>
                    <div>
                      <strong>{flight.to}</strong>
                      <span>{flight.toDetail}</span>
                    </div>
                  </div>

                  <dl className="detail-grid compact">
                    <div>
                      <dt>出發</dt>
                      <dd>{flight.departure}</dd>
                    </div>
                    <div>
                      <dt>抵達</dt>
                      <dd>{flight.arrival}</dd>
                    </div>
                    <div>
                      <dt>航程</dt>
                      <dd>{flight.duration}</dd>
                    </div>
                    <div>
                      <dt>行李</dt>
                      <dd>{flight.baggage}</dd>
                    </div>
                    <div>
                      <dt>艙等</dt>
                      <dd>{flight.class}</dd>
                    </div>
                    <div>
                      <dt>狀態</dt>
                      <dd>{flight.status}</dd>
                    </div>
                    <div className="wide-detail">
                      <dt>營運航空</dt>
                      <dd>{flight.operator}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === "pretrip" && (
        <section className="panel" aria-labelledby="pretrip-title">
          <div className="section-heading">
            <div>
              <h2 id="pretrip-title">行前確認</h2>
            </div>
            <p className="summary-pill">必須剩 {mustRemaining} 項</p>
          </div>

          <div className="checklist-groups">
            <article className="checklist-group">
              <div className="checklist-heading">
                <div>
                  <h3>必須</h3>
                </div>
                <span>
                  {pretripChecklist.must.length - mustRemaining}/{pretripChecklist.must.length}
                </span>
              </div>

              <ul className="shopping-list checklist-list">
                {pretripChecklist.must.map((item) => (
                  <li key={item.id} className={pretripStatus[item.id] ? "done" : ""}>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(pretripStatus[item.id])}
                        onChange={() => togglePretripItem(item.id)}
                      />
                      <span>{item.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </article>

            <article className="checklist-group">
              <div className="checklist-heading">
                <div>
                  <h3>建議</h3>
                </div>
                <span>
                  {pretripChecklist.suggested.length - suggestedRemaining}/{pretripChecklist.suggested.length}
                </span>
              </div>

              <ul className="shopping-list checklist-list">
                {pretripChecklist.suggested.map((item) => (
                  <li key={item.id} className={pretripStatus[item.id] ? "done" : ""}>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(pretripStatus[item.id])}
                        onChange={() => togglePretripItem(item.id)}
                      />
                      <span>{item.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      )}

      {page === "notes" && (
        <section className="panel" aria-labelledby="notes-title">
          <div className="section-heading">
            <div>
              <h2 id="notes-title">個人筆記</h2>
            </div>
            <p className="summary-pill">{notes.length} 則</p>
          </div>

          <form className="note-form" onSubmit={addNote}>
            <label className="note-field">
              標題
              <input
                value={newNote.title}
                onChange={(event) => updateNewNote("title", event.target.value)}
                placeholder="例如：想去的咖啡廳"
              />
            </label>

            <label className="note-field">
              Link
              <input
                value={newNote.link}
                onChange={(event) => updateNewNote("link", event.target.value)}
                placeholder="貼 Google Maps、訂位頁或參考連結"
                inputMode="url"
              />
            </label>

            <label className="note-field wide">
              內容
              <textarea
                value={newNote.content}
                onChange={(event) => updateNewNote("content", event.target.value)}
                placeholder="補充想記下來的資訊"
              />
            </label>

            <button className="primary-button" type="submit">
              新增筆記
            </button>
          </form>

          {notes.length === 0 ? (
            <p className="empty-state">還沒有筆記，可以先把臨時想到的店家、路線或注意事項放這裡。</p>
          ) : (
            <ul className="notes-list">
              {notes.map((note) => {
                const safeLink = getSafeLinkHref(note.link);

                return (
                  <li className="note-card" key={note.id}>
                    <div className="note-card-header">
                      <h3>{note.title}</h3>
                      <button type="button" aria-label={`刪除 ${note.title}`} onClick={() => removeNote(note.id)}>
                        刪除
                      </button>
                    </div>
                    {safeLink && (
                      <a className="note-link" href={safeLink} target="_blank" rel="noreferrer">
                        開啟連結
                      </a>
                    )}
                    {note.content && <p>{note.content}</p>}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {page === "shopping" && (
        <section className="panel" aria-labelledby="shopping-title">
          <div className="section-heading">
            <div>
              <h2 id="shopping-title">購買清單</h2>
            </div>
            <p className="summary-pill">還有 {remainingShopping} 項</p>
          </div>

          <form className="shopping-form" onSubmit={addShoppingItem}>
            <input
              value={newShoppingItem}
              onChange={(event) => setNewShoppingItem(event.target.value)}
              placeholder="新增想買的東西"
            />
            <button className="primary-button" type="submit">
              新增
            </button>
          </form>

          <ul className="shopping-list">
            {shopping.map((item) => (
              <li key={item.id} className={item.done ? "done" : ""}>
                <label>
                  <input type="checkbox" checked={item.done} onChange={() => toggleShoppingItem(item.id)} />
                  <span>{item.text}</span>
                </label>
                <button type="button" aria-label={`刪除 ${item.text}`} onClick={() => removeShoppingItem(item.id)}>
                  刪除
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {page === "accounting" && (
        <section className="panel" aria-labelledby="accounting-title">
          <div className="section-heading">
            <div>
              <h2 id="accounting-title">簡易記帳</h2>
            </div>
            {/* <p className="summary-pill">剩餘 {formatYen(remainingJpy)}</p> */}
          </div>

          <div className="money-summary" aria-label="花費摘要">
            <article className="money-card main">
              <span>剩餘日幣</span>
              <strong className={remainingJpy < 0 ? "danger" : ""}>{formatYen(remainingJpy)}</strong>
            </article>
            <article className="money-card">
              <span>現金花費</span>
              <strong>{formatYen(cashSpent)}</strong>
            </article>
            <article className="money-card">
              <span>刷卡花費</span>
              <strong>{formatYen(cardSpent)}</strong>
            </article>
            <article className="money-card total">
              <span>總花費</span>
              <strong>{formatYen(totalSpent)}</strong>
            </article>
          </div>

          <label className="accounting-total-field">
            總日幣
            <input
              value={accounting.totalJpy ?? ""}
              onChange={(event) => updateTotalJpy(event.target.value)}
              inputMode="numeric"
              placeholder="輸入目前身上的日幣現金"
            />
          </label>

          <form className="expense-form" onSubmit={addExpense}>
            <label>
              項目
              <input
                value={newExpense.title}
                onChange={(event) => updateNewExpense("title", event.target.value)}
                placeholder="例如：午餐"
              />
            </label>

            <label>
              金額
              <input
                value={newExpense.amount}
                onChange={(event) => updateNewExpense("amount", event.target.value)}
                inputMode="numeric"
                placeholder="例如：1200"
              />
            </label>

            <label className="wide">
              付款方式
              <select value={newExpense.method} onChange={(event) => updateNewExpense("method", event.target.value)}>
                <option value="cash">現金</option>
                <option value="card">刷卡</option>
              </select>
            </label>

            <button className="primary-button" type="submit">
              新增記帳
            </button>
          </form>

          {expenses.length === 0 ? (
            <p className="empty-state">還沒有記帳，先輸入總日幣，再把現金或刷卡花費逐筆加進來。</p>
          ) : (
            <ul className="expense-list">
              {expenses.map((expense) => (
                <li className={`expense-item ${expense.method}`} key={expense.id}>
                  <div>
                    <strong>{expense.title}</strong>
                    <span>{expense.method === "cash" ? "現金" : "刷卡"}</span>
                  </div>
                  <div className="expense-amount">{formatYen(expense.amount)}</div>
                  <button type="button" aria-label={`刪除 ${expense.title}`} onClick={() => removeExpense(expense.id)}>
                    刪除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
