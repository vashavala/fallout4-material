'use client'
// import { TABLES0, TABLES1, TABLES2 } from '../../garage/index'
import { TABLES0 } from '../../garage/Tables0'
import { TABLES1 } from '../../garage/Tables1'
import { TABLES2 } from '../../garage/Tables2'
import { useState } from "react";

export default function Home() {
  const [tables, setTables] = useState([...TABLES0, ...TABLES1, ...TABLES2])
  const MAP: any = { '∞': 999, 'n/a': 0, 'N/A': 0 }
  const sort = (idx: number, prop: any) => {
    let updatedRows = [...tables[idx].rows];

    const row0: any = updatedRows[0]
    const row1: any = updatedRows[1]
    updatedRows.sort((a: any, b: any) => {
      if (a[prop] in MAP) a[prop] = MAP[a[prop]]
      if (b[prop] in MAP) b[prop] = MAP[b[prop]]
      return +row0[prop] > +row1[prop] ? +a[prop] - +b[prop] : +b[prop] - +a[prop]
    })
    // Replace the sorted rows in the original tables array
    const updatedTables = [...tables]; // Shallow copy of tables
    updatedTables[idx] = { ...updatedTables[idx], rows: updatedRows }; // Replace the rows of the target table

    // Update state with the new array
    setTables(updatedTables);
  }
  return (
    <main className="h-screen w-screen  bg-black text-white overflow-auto">
      <div className='w-full max-sm:columns-1 max-xl:columns-2 columns-3'>
        {tables.map((t, idx) => (
          t.rows.length ? (<div key={t.name} className='w-[100%] break-inside-avoid mb-8'>
            <div className='w-[100%] flex'>
              <span className='w-[70%] text-2xl flex'>{t.name}</span>
              <span className='w-[10%] cursor-pointer text-center ' onClick={() => sort(idx, 'yield')}>y</span>
              <span className='w-[10%] cursor-pointer text-center ' onClick={() => sort(idx, 'weight')}>w</span>
              <span className='w-[10%] cursor-pointer text-center ' onClick={() => sort(idx, 'ratio')}>r</span>
            </div>
            {t.rows.map((row: any) => (
              <div key={row.name} className='w-[100%] flex'>
                <span className='w-[70%] flex'>{row.name}</span>
                <span className='w-[10%] text-center'>{row.yield}</span>
                <span className='w-[10%] text-center'>{row.weight}</span>
                <span className='w-[10%] text-center'>{row.ratio}</span>
              </div>
            ))}
          </div>) : null
        ))}
      </div>
    </main>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">src/app/page.tsx</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{" "}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className="mb-3 text-2xl font-semibold">
    //         Docs{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className="m-0 max-w-[30ch] text-sm opacity-50">
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className="mb-3 text-2xl font-semibold">
    //         Learn{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className="m-0 max-w-[30ch] text-sm opacity-50">
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className="mb-3 text-2xl font-semibold">
    //         Templates{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className="m-0 max-w-[30ch] text-sm opacity-50">
    //         Explore starter templates for Next.js.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className="mb-3 text-2xl font-semibold">
    //         Deploy{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  );
}
