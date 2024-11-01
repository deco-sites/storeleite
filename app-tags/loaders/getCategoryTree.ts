import { allowCorsFor } from "@deco/deco";
import { AppContext } from "../mod.ts";
import { Category, OrganizedCategory, PropsCategory } from "../utils/types.ts";
/**
 * @title Tag Integration 
 * @description Category List
 */
const loader = async (
  _props: PropsCategory,
  req: Request,
  ctx: AppContext,
): Promise<OrganizedCategory[] | null> => {

  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  try {
    // Fetch categories from VTEX API
    const response = await fetch(`https://${ctx.account}.vtexcommercestable.com.br/api/catalog_system/pub/category/tree/1`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const categories: Category[] = await response.json();
    const organizedCategories = organizeCategories(categories);

    return organizedCategories;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default loader;

/**
 * This function organizes categories into a flat list with `value` and `label`
 */
function organizeCategories(data: Category[]): OrganizedCategory[] {
  const result: OrganizedCategory[] = [];

  data.forEach((category) => {
    result.push({ value: `${category.id}`, label: `${category.id} - ${category.name}` });
    category.children.forEach((child) => {
      result.push({ value: `${child.id}`, label: `${child.id} - ${child.name}` });
    });
  });

  return result;
}
