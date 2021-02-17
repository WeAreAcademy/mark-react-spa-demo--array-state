/**
 * Key takeaway: handling array state often requires us to
 *  use the update callback argument for setState
 */

import { useState } from "react";

function App() {
  const [fizzbuzzList, setFizzbuzzList] = useState(["1"]);

  const handleRemoveOne = () =>
    setFizzbuzzList((prevList) => {
      const lastIndex = prevList.length - 1;
      // (ideally would handle lastIndex < 0, but it works without)
      return prevList.slice(0, lastIndex); // slice excludes final index
    });

  // HOF to return a function
  const makeAddToList = (nextString: string) => {
    // using update syntax because next state depends on previous state
    return () =>
      setFizzbuzzList((prevList) => [
        // using spread syntax
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        ...prevList, // spreads out previous list into new array
        nextString,
      ]);
  };

  /**
   * The next number in the sequence.
   *
   * It is 'derived data' - rather than storing and
   *  managing this separately, we can *derive* it
   *  from the existing thing that we are storing:
   *  our fizzbuzz list.
   *
   * (Add one since we're looking at _next_ number.)
   */
  const nextNumber = fizzbuzzList.length + 1;

  return (
    <div>
      <h1>Let's play Fizzbuzz!</h1>
      <h2>Next number: {nextNumber}</h2>
      <p>
        <b>List so far:</b> {fizzbuzzList.join(", ")}
      </p>
      <p>Press to add to list:</p>
      <button onClick={makeAddToList(nextNumber.toString())}>Number</button>
      <button onClick={makeAddToList("Fizz")}>Fizz</button>
      <button onClick={makeAddToList("Buzz")}>Buzz</button>
      <button onClick={makeAddToList("Fizzbuzz")}>Fizzbuzz</button>
      <button onClick={handleRemoveOne}>Remove one</button>
    </div>
  );
}

export default App;
