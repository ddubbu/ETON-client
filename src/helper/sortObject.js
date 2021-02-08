export default function sortObject(obejct, priorityStr){
  const result = [];

  // 빈 리스트이면 pass
  if (priorityStr.length === 0) return result; 

  const priority = priorityStr.split(',');
  priority.forEach((key)=>{
    if(!(obejct[key]==='')) result.push(obejct[key]);
  })

  return result;  
}