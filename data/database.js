class Denim {}
class DenimList {}

const denimDb = [
  ['Acne Studios', 'Ace', 28],
  ['Nudie', 'Tube Tom', 27],
  ["Levi's", '501', 28],
];

const denims=  denimDb.map((denimArr,i)=>{
    const denim = new Denim()
    denim.brand = denimArr[0];
    denim.model = denimArr[1];
    denim.size = denimArr[2];
    denim.id = `${i}`;
    return denim;
});

const denimList = new DenimList()
denimList.id = 1

module.exports = {
  getDenim : (id) => denims[id],
  getDenims : () => denims,
  getDenimList : () => denimList,
  Denim,
  DenimList
}
