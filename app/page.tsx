import { HomeExperience } from "@/components/home-experience";
import { faqs, solutions } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.cdmiracle.com/#organization",
      name: "成都米乐高图像科技有限公司",
      alternateName: "米乐高图像科技",
      description: "数字光影与沉浸式空间综合解决方案服务商。",
      logo: "https://www.cdmiracle.com/images/millegao-logo-dark.png",
      telephone: ["028-88592078", "18780285932"],
      address: { "@type": "PostalAddress", addressLocality: "成都", addressRegion: "四川", addressCountry: "CN" },
      areaServed: "中国"
    },
    {
      "@type": "ItemList",
      name: "米乐高数字视觉解决方案",
      itemListElement: solutions.map((item, index) => ({
        "@type": "Service",
        position: index + 1,
        name: item.title,
        provider: { "@id": "https://www.cdmiracle.com/#organization" }
      }))
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    }
  ]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeExperience />
    </>
  );
}
