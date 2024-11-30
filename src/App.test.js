import React from "react";

export default function Search() {

  
  /**
   * @param {{ get: (arg0: string) => any; }} formData
   */
  function search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
    console.log(`hi, ${query}`);
    
  }
  return (
    <form action={search}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
  );
}
