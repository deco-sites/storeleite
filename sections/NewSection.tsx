import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";
import { ImageWidget } from 'apps/admin/widgets.ts';

interface Props {
  /**
   * @description The title of the image converter section
   * @format rich-text
   */
  title?: string;
  /**
   * @description The description of the image converter
   * @format textarea
   */
  description?: string;
  /**
   * @description The label for the image upload button
   */
  uploadButtonLabel?: string;
  /**
   * @description The label for the download button
   */
  downloadButtonLabel?: string;
  /**
   * @description The selected image
   */
  selectedImage?: ImageWidget;
  /**
   * @description The selected format
   */
  selectedFormat?: string;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const selectedFormat = form.get("format") as string;
  const selectedImage = form.get("image") as File;

  // Here you would implement the image conversion logic
  // For this example, we'll just update the props
  return { ...props, selectedImage, selectedFormat };
}

export function loader(props: Props) {
  return props;
}

export default function ImageConverter({
  title = "Image Format Converter",
  description = "Upload an image and choose the format you want to convert it to.",
  uploadButtonLabel = "Upload Image",
  downloadButtonLabel = "Download Converted Image",
  selectedImage,
  selectedFormat = "png",
}: Props) {
  const generateSectionUrl = (props: Props, otherProps: { href?: string } = {}) => {
    const sectionProps = {
      ...otherProps,
      props,
    };
    return useSection(sectionProps);
  };

  return (
    <div class="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">{title}</h2>
      <p class="mb-6 text-center text-gray-600">{description}</p>
      
      <form
        hx-post={generateSectionUrl({ title, description, uploadButtonLabel, downloadButtonLabel, selectedImage, selectedFormat })}
        hx-target="closest div"
        hx-swap="outerHTML"
        enctype="multipart/form-data"
      >
        <div class="mb-6">
          <label class="btn btn-primary w-full">
            {uploadButtonLabel}
            <input
              type="file"
              name="image"
              accept="image/*"
              class="hidden"
              hx-trigger="change"
              hx-post={generateSectionUrl({ title, description, uploadButtonLabel, downloadButtonLabel, selectedImage, selectedFormat })}
            />
          </label>
        </div>
        
        {selectedImage && (
          <div class="mb-6">
            <img
              src={selectedImage}
              alt="Selected"
              class="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
        
        <div class="mb-6">
          <select
            name="format"
            class="select select-bordered w-full"
            hx-trigger="change"
            hx-post={generateSectionUrl({ title, description, uploadButtonLabel, downloadButtonLabel, selectedImage, selectedFormat })}
          >
            <option value="png" selected={selectedFormat === "png"}>PNG</option>
            <option value="jpeg" selected={selectedFormat === "jpeg"}>JPEG</option>
            <option value="webp" selected={selectedFormat === "webp"}>WebP</option>
          </select>
        </div>
        
        <button
          type="submit"
          class="btn btn-secondary w-full"
          disabled={!selectedImage}
        >
          {downloadButtonLabel}
        </button>
      </form>
    </div>
  );
}