"use client"

import { useEffect, useRef, useState } from "react"
import NavSidebar from "@/components/nav-sidebar"
import ContentSection from "@/components/content-section"

// Sample data for our sections
const sections = [
  {
    id: "header-1",
    title: "網站功能",
    isHeader: true,
  },
  {
    id: "section1",
    title: "網站快速上線",
    description:
      "我們協助將貴公司商標（LOGO）、品牌圖文與產品資料整合進網站中，並依據網站目的規劃適當的架構與內容配置，最快可於**數日內完成佈署**並上線，讓您迅速擁有符合企業形象的專屬網站。\n\n不需要繁瑣的開發流程，**無需等待數月**即可擁有專業網站。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section2",
    title: "合法圖庫支援",
    description:
      "提供來自**專業圖庫的合法圖片素材**，並由設計師依照行業類型與品牌調性進行圖片挑選與配置，不僅避免侵權風險，亦能大幅提升網站的視覺吸引力與專業感。\n\n所有圖片皆**取得合法授權**，讓您無後顧之憂。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section3",
    title: "系統維護與升級",
    description:
      "我們的技術團隊會**定期為網站進行安全性維護**、功能修正與系統升級，您無需擔心技術老化或被駭等風險，亦不需聘請內部工程師維護，大幅降低後續維運成本。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section4",
    title: "低額平台費用",
    description:
      "每年僅需支付少量平台維運費，即可持續使用網站服務，包含主機空間、程式升級與功能支援，提供**高性價比的網站解決方案**。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section5",
    title: "一站式主機金物流整合",
    description:
      "無須另尋主機空間與金流物流串接服務，本平台整合所有建站所需功能，從域名、主機、SSL、安全備份，到金流（如**綠界/LINE PAY**）與物流（**宅配/超商**）一應俱全，節省整合成本與時間。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section6",
    title: "免費網站佈置協助",
    description:
      "GuideMee 提供**免費的一次性網站初始佈置服務**，包含頁面區塊建置、分類設定、LOGO色調套用、金物流參數設定等，並可協助業主學習網站內容維護與產品圖片管理，降低操作門檻。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section7",
    title: "首頁類型支援",
    description:
      "支援**形象型網站**（無購物功能，適合服務型或作品展示）與**購物網站**（具商品頁與購物車功能），可依您的業務需求彈性調整。\n\n未來也能自行上傳自製圖檔，自由更換首頁形象。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section8",
    title: "SEO 搜尋優化",
    description:
      "提供 **Google、Yahoo** 等主流搜尋引擎提交功能，並可針對每頁/每篇商品自定義 SEO 標題與描述（Title & Description），網站後台亦可串接 **Google Analytics（GA）**，協助分析網站訪客行為，有效提升曝光與行銷效果。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section9",
    title: "頁面管理功能",
    description:
      "支援網頁的新增、編輯與刪除，內建HTML可視化編輯器，**無需懂程式也能輕鬆排版**；每個頁面亦可單獨設定 SEO 資訊、圖片與超連結，提升網頁靈活度與經營效率。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "header-2",
    title: "後台功能",
    isHeader: true,
  },
  {
    id: "section10",
    title: "後台語系",
    description:
      "支援**多語系後台介面**，讓不同語言使用者都能輕鬆操作。\n\n預設為繁體中文，並可啟用 Google 自動翻譯功能，支援簡體中文、英文、日文、韓文等語言，讓您在不同語言的環境下使用網站後台管理系統，提升國際化運營的靈活性。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section11",
    title: "後台界面",
    description:
      "主控台提供**即時**的業務數據顯示，包括**當日營收、新客戶、新訂單及歷史數據查詢功能**。業主可快速查看網站的運營狀況，並按日期區間查詢各項數據，幫助您即時做出調整與決策。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section12",
    title: "會員管理",
    description:
      "**- 新增會員：**可手動新增會員，並設定會員基本資料。\n\n- **自動加入會員：**用戶在網站註冊後會自動成為會員，您可選擇是否手動將其列入黑名單，停止使用該會員帳號。\n\n**- 會員等級設定**：可設定會員入會條件、升級與續等條件，並設置相關的會員專屬優惠，例如：Email認證回饋金、會員折扣、生日禮金等。這些設定有助於提升會員粘性與忠   誠度。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section13",
    title: "商品管理",
    description:
      "**- 商品數量上限：**商品數量預設為1000樣(預設範圍,目前無實際限制,如大量超用時,需另行洽談)。\n\n **- 變化組合類型：**商品可以設定多種屬性變化，如顏色、尺寸、材質等，並為每個變化設置獨立的庫存量。\n\n **- 庫存量設定：**系統允許設定每個商品的庫存數量，並可隨時更新，確保庫存狀況透明且可控。\n\n **- 銷售狀態管理：**可手動切換商品的銷售狀態，選擇上架或下架商品，方便管理庫存與促銷活動。\n\n **- 蝦皮一鍵同步：**可將蝦皮上的商品同步至網站，無需重新建立商品資料，輕鬆完成多平台銷售管理。\n\n **- 商品價格設定：**支持原價、售價、會員價的設置，讓不同會員等級可享有不同的優惠價格。\n\n **- 商品分類管理：**可自訂商品的分類標籤，並選擇對應的分類來顯示商品，方便客戶根據類別篩選與購買。\n\n **- 商品圖片上傳：**支援批次上傳商品圖片，讓大量商品的圖片管理變得更加高效。\n\n **- 商品匯入匯出功能：**可將商品資料匯出至 Excel 進行批次編輯，或將修改後的商品資料重新匯入，簡化管理流程。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section14",
    title: "商品分類管理",
    description:
      "商品分類支援自訂，您可以依據產品特性創建不同的分類。每個分類可根據樹狀結構層級展示，便於管理**大量商品**，並可提升顧客的瀏覽體驗。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section15",
    title: "活動行銷",
    description:
      "**- 活動折扣券發放：**您可以創建自定義折扣券，並設置使用條件，如折扣方式（百分比折扣或固定金額折扣）、使用對象（不限會員或僅限會員）、使用次數（每張折扣券總使用次數及每個會員使用次數限制）。\n\n **- 折扣券代碼設定：**您可以創建獨特的折扣代碼，並且根據設置的條件決定折扣生效。顧客在結帳時輸入代碼，即可獲得優惠。\n\n **- 折扣商品設定：**可選擇折扣適用的商品或品牌，進行專屬折扣促銷，靈活的促銷方式可提高銷售額。\n\n **- 折扣券適用期限：**可設定折扣券的有效期（開始日期與結束日期），使活動在特定時間內運行。\n\n **- 折扣券統計：**系統會提供折扣券使用情況的詳細報表，讓您可以查看每張折扣券的使用次數及相關訂單統計，幫助評估活動效果。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section16",
    title: "訂單管理",
    description:
      "**- 訂單狀態：**可以設定訂單的不同狀態，如待付款、已付款、已發貨、已完成等，讓您清楚了解訂單處理的進度。\n\n **- 訂單編輯與修改：**您可以手動修改訂單資訊，包括客戶資料、商品內容及支付狀況等，進行訂單的後續處理。\n\n **- 訂單搜尋與過濾：**提供強大的搜尋篩選功能，能夠根據訂單編號、客戶姓名、訂單狀態等條件進行快速搜尋。\n\n **- 訂單報表：**系統可匯出訂單數據報表，讓您可以查看不同時間段的訂單情況，幫助您進行銷售與庫存的分析。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section17",
    title: "物流設定",
    description:
      "物流設定功能讓您設置與第三方物流平台的集成，簡化配送流程。\n\n **- 物流選擇：**您可以設置不同的物流配送選項，並設置運費規則。\n\n **- 物流跟蹤：**支持與第三方物流系統進行對接，如果綠界科技申請好,只要新增超商取貨,就可以直接使用物流。\n\n **- 發貨設定：**可自定義每種配送方式的運費、名稱等，提供顧客更好的購物體驗。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section18",
    title: "金流設定",
    description:
      "填入已申請完成的第三方支付碼,立即完成\n\n **-綠界科技：**2.75%\n\n參考位置：[綠界科技官網](https://www.ecpay.com.tw/Business/payment_fees)\n\n  **-藍新科技：**2.8% \n\n 參考位置：[藍新科技官網](https://www.newebpay.com/website/Page/content/service_fare) \n\n **-黑貓金流：**2.6% \n\n **- LINEPAY (需自行申請)** \n\n **-街口支付(需自行申請)** \n\n **-自訂收費方式**",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "header-3",
    title: "網站樣式設計",
    isHeader: true,
  },
  {
    id: "section19",
    title: "網頁版面",
    description:
      "**- 頁面布局：**支援自訂頁面區塊、功能區域，根據網站的內容與功能需求，靈活調整版面佈局。\n\n **- 圖片與視覺設計：**網站視覺風格與圖片展示可以進行自定義設定，提升網站的專業性與美觀度。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section20",
    title: "選單設定",
    description:
      "**- 選單結構設定：**您可以創建多層級的選單結構，包括主選單與子選單，方便顧客快速導航。\n\n **- 選單鏈接設定：**可設定每個選單項目的鏈接，指向網站內頁或外部網站，靈活配置選單內容。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section21",
    title: "文章功能",
    description:
      "**- 文章發布：**輕鬆發布文章，設置標題、內容、圖片等. - 分類與標籤：為文章設置分類與標籤，方便讀者查找相關內容，提高文章的可見性。\n\n **- 文章評論管理：**支援顧客對文章的評論功能，您可以選擇是否開啟評論並進行管理。\n\n **- SEO優化：**系統支持為每篇文章設置Title、Description等SEO元素，提高文章在搜尋引擎中的排名。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section22",
    title: "表單填寫/問卷",
    description:
      "**- 表單設計：**提供可視化表單設計工具，您可以根據需求自定義表單欄位，並設置必填欄位、選擇框、文字輸入框等。\n\n **- 問卷設定：**可根據需求設計調查問卷，收集顧客意見或市場調查數據。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section23",
    title: "置頂訊息設定",
    description: "**- 訊息自定義：**您可以設置置頂最多**三則**跑馬燈的內容、顏色、背景色、時間等，讓訊息更加醒目。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section24",
    title: "頁尾佈置",
    description:
      "**- 內容設置：**可在頁尾加入聯絡資訊、公司簡介、隱私政策等，並設置社交媒體鏈接。\n\n **- 版面設計：**可自定義頁尾的樣式(1-4欄)、顏色和排版，亦可使用自訂HTML,編輯內容方式，保持網站整體一致性。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "header-4",
    title: "進階設定",
    isHeader: true,
  },
  {
    id: "section25",
    title: "網站站台設定",
    description:
      "**- 網站基本資料：**設置網站**關鍵字**、簡介、GA-Code等基本資料。\n\n **- 其他設定：設定是否開啟前台特效、免運金額條件。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section26",
    title: "通知設定",
    description: "**- 系統通知：**設置問券調查/會員註冊/訂單付款等重要通知，系統會自動發送給管理員。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section27",
    title: "社群登入OPENID",
    description:
      "**- OpenID協議支持：**可集成**Facebook、Google、Line**等社群平台的登入功能。\n\n **- 社群帳號綁定：**用戶在登入時可選擇綁定社交帳號，方便未來快速登入。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section28",
    title: "簡訊通知",
    description: "可串接互動資通簡訊(必須自行開通帳號及儲值)\n\n **- 簡訊驗證：**註冊使用簡訊驗証。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "section29",
    title: "主機規格",
    description:
      "**-共享型主機：**主機將保持效能正常穩定，確保網站的訪問速度與穩定性。\n\n **-安全性：**提供安全防護措施，如防火牆、SSL加密等，確保網站資料安全。\n\n **-加購/遷移主機：**業主如做行銷廣告，會有大量頻寬使用需求，必須提前告知，業主可另外加購行銷活動獨立主機運作，蓋米可免費協助網站備份搬移至新主機。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("section1")
  const [isLoading, setIsLoading] = useState(true)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Filter out header sections for intersection observer
  const contentSections = sections.filter((section) => !section.isHeader)

  // Create animated particles
  const createParticles = () => {
    const particles = []
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 5 + 2
      const left = Math.random() * 90 + 5 // Limit to 5%-95% of width
      const top = Math.random() * 90 + 5 // Limit to 5%-95% of height
      const delay = Math.random() * 10
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
          }}
        ></div>,
      )
    }
    return particles
  }

  // Create binary code elements
  const createBinaryElements = () => {
    const elements = []
    for (let i = 0; i < 8; i++) {
      const binary = Array.from({ length: 20 }, () => Math.round(Math.random())).join("")
      const left = Math.random() * 90 + 5 // Limit to 5%-95% of width
      const top = Math.random() * 90 + 5 // Limit to 5%-95% of height
      const rotation = Math.random() * 360
      elements.push(
        <div
          key={i}
          className="binary"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          {binary}
        </div>,
      )
    }
    return elements
  }

  // Create circuit paths
  const createCircuitPaths = () => {
    const paths = []
    for (let i = 0; i < 10; i++) {
      const length = 50 + Math.random() * 100 // Reduced max length
      const left = Math.random() * 85 + 5 // Limit to 5%-90% of width
      const top = Math.random() * 90 + 5 // Limit to 5%-95% of height
      const rotation = Math.random() * 360
      paths.push(
        <div
          key={i}
          className="circuit-path"
          style={{
            width: `${length}px`,
            left: `${left}%`,
            top: `${top}%`,
            transform: `rotate(${rotation}deg)`,
            animationDelay: `${i * 0.3}s`,
          }}
        ></div>,
      )
    }
    return paths
  }

  // Create scanner lines
  const createScannerLines = () => {
    const lines = []
    for (let i = 0; i < 3; i++) {
      lines.push(
        <div
          key={i}
          className="scanner-line"
          style={{
            animationDelay: `${i * 3}s`,
          }}
        ></div>,
      )
    }
    return lines
  }

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const observers: IntersectionObserver[] = []

    // Set up intersection observers for each section
    Object.keys(sectionRefs.current).forEach((id) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        { threshold: 0.3 }, // Trigger when 30% of the section is visible (reduced from 50%)
      )

      if (sectionRefs.current[id]) {
        observer.observe(sectionRefs.current[id]!)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900 z-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-purple-500 animate-spin animation-delay-500"></div>
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            載入中...
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-x-hidden">
      {/* Tech-inspired animated background */}
      <div className="tech-grid"></div>
      <div className="tech-circle" style={{ width: "300px", height: "300px", top: "10%", left: "20%" }}></div>
      <div className="tech-circle" style={{ width: "400px", height: "400px", bottom: "10%", right: "15%" }}></div>
      <div
        className="tech-square"
        style={{ width: "100px", height: "100px", top: "30%", right: "10%", transform: "rotate(45deg)" }}
      ></div>
      <div
        className="tech-square"
        style={{ width: "80px", height: "80px", bottom: "20%", left: "5%", transform: "rotate(20deg)" }}
      ></div>
      <div className="tech-ring" style={{ width: "200px", height: "200px", top: "40%", left: "30%" }}></div>
      <div className="tech-ring" style={{ width: "300px", height: "300px", bottom: "30%", right: "25%" }}></div>

      {/* Additional animated elements */}
      <div className="particles-container overflow-hidden">
        {createParticles()}
        {createBinaryElements()}
        {createCircuitPaths()}
        {createScannerLines()}
      </div>

      <NavSidebar
        sections={sections}
        activeSection={activeSection}
        onNavClick={(id) => {
          // Only scroll to sections that are not headers
          if (!id.startsWith("header-")) {
            sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" })
          }
        }}
      />

      <main className="flex-1 p-6 md:p-10 md:ml-80 overflow-y-auto">
        {contentSections.map((section) => {
          const { id, title, description, imageUrl } = section
          return (
            <ContentSection
              key={id}
              id={id}
              title={title}
              description={description}
              imageUrl={imageUrl}
              ref={(el) => (sectionRefs.current[id] = el)}
            />
          )
        })}
      </main>
    </div>
  )
}
