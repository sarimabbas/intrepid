import EditorInstance from "../../Editor/EditorInstance";

const convertTocArrayToTreeHelper = (tocArray, currPosition) => {
  if (tocArray.length < 1) {
    return [];
  }
  // look at the start of array
  const start = tocArray[0];
  // get an array as far ahead as you can where level is > start
  const nextSliceGreaterThan = [];
  let i = 1; // start at the 2nd element of tocArray
  while (i < tocArray.length && tocArray[i].attrs.level > start.attrs.level) {
    nextSliceGreaterThan.push(tocArray[i]);
    i++;
  }
  // update the global counter as far ahead as i went
  if (i > currPosition.val) {
    currPosition.val = i;
  }
  // this new array will be the children of start in results
  if (nextSliceGreaterThan.length > 0) {
    const childrenResult = convertTocArrayToTree(nextSliceGreaterThan);
    return [
      {
        title: start.content[0].text,
        isExpanded: true, // keep all parent nodes expanded by default
        children: childrenResult,
        data: {
          level: start.attrs.level,
          id: start.attrs.id
        },
        isDraggable: false
      }
    ];
  } else {
    return [
      {
        title: start.content[0].text,
        isLeaf: true,
        data: {
          level: start.attrs.level,
          id: start.attrs.id
        },
        isDraggable: false
      }
    ];
  }
};

export const convertTocArrayToTree = tocArray => {
  if (tocArray.length < 1) {
    return [];
  }
  // keep repeating until tocArray is exhausted
  let result = [];
  const currPosition = { val: 0 };
  while (tocArray.length > 0) {
    tocArray = tocArray.slice(currPosition.val);
    currPosition.val = 0; // reset for next round
    const tree = convertTocArrayToTreeHelper(tocArray, currPosition);
    result = result.concat(tree);
  }
  return result;
};

export const getCurrentTocArray = () => {
  const data = EditorInstance.getJSON();
  //   console.log(data);
  return data.content.filter(
    block => block.content && block.type === "heading"
  );
};

export const createOutline = () => {
  const flat = getCurrentTocArray();
  const nested = convertTocArrayToTree(flat);
  return nested;
};
