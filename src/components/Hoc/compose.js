const compose = (...funcs) => (comp) => funcs.reduceRight(
  (prev, f) => f(prev), 
  comp
);

export default compose;