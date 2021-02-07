export default function sortObject(obejct, priorityStr){
  const result = [];
  const priority = priorityStr.split(',');

  priority.forEach((key)=>{
    result.push(obejct[key]);
  })

  return result;  
}