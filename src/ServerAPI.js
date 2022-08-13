import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keympvyjMiMXMEpYp",
});
export const base = Airtable.base("appsnhP7qGYRClq2f");

// export const fetchBoardsList = () => {
//   const projectsArray = [];
//   base("tblvtOCVjHry3eIFs")
//     .select({
//       fields: ["fldglWMyslDbf6PdL"],
//     })
//     .eachPage(
//       function page(records, fetchNextPage) {
//         records.forEach((record) => {
//           projectsArray.push({
//             id: record.id,
//             board: record.fields.Projects,
//           });
//         });

//         fetchNextPage();
//       },
//       function done(err) {
//         if (err) {
//           return;
//         }
//       }
//     );
//   const boards = [...new Set(projectsArray)];
//   return boards;
// };

// console.log(fetchBoardsList());
