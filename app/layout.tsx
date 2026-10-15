import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: {default:'Rohit Shendurkar — Full-Stack Developer & AI Engineer',template:'%s'},
 description:'Rohit Shendurkar is a full-stack developer from IIIT Nagpur building industrial IoT backend systems, applied AI pipelines and useful web software. Explore in-depth engineering case studies.',
 keywords:['Rohit Shendurkar','Software Engineer','Full Stack Developer','FastAPI','React','Industrial IoT','RAG','Qdrant','Next.js','YOLOv8'],
 openGraph:{type:'website',title:'Rohit Shendurkar — Engineering Portfolio',description:'Backend systems, industrial IoT, applied AI and in-depth technical case studies.'},
 robots:{index:true,follow:true},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
