const composeHoc = (...funcs) => (comp) => funcs.reduceRight(
  (prev, f) => f(prev), 
  comp
);

export default composeHoc;