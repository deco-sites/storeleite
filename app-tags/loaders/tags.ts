import { AppContext } from "../mod.ts";

/**
 * @title This name will appear on the admin
 */
const loader = (
  _props: unknown,
  _req: Request,
  ctx: AppContext,
) => {
  const flagDiscountThirdFor = ctx.flagDiscountThirdFor;
  const flagCustom = ctx.flagCustom;
  const flagSpecial = ctx.flagSpecial;
  const discount = ctx.discount; 


  const result = {
    flagDiscountThirdFor: flagDiscountThirdFor,
    flagCustom: flagCustom,
    flagSpecial: flagSpecial,
    discount: discount
  };

  return result;
};
export default loader;
