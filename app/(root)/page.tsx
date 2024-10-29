// 'use client'
// import SearchForm from "../components/SearchForm";
// import { useSearchParams } from "next/navigation";

// export default function Home() {

//   const searchParams = useSearchParams();
//   const query = searchParams.get("search") || "";

//   return (
//     <>
//       <section className="pink_container">
//         <h1 className="heading">
//           Pitch your Startup,<br /> Connect with entrepreneurs
//         </h1>

//         <p className="sub-heading !max-w-3xl">
//           Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
//         </p>

//         <SearchForm query = {query}/>
//       </section>

//     </>
//   );
// }

import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your Startup,<br /> Connect with entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

    </>
  );
}
