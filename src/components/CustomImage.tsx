import Image, { ImageProps } from 'next/image';

type Props = ImageProps & { base64?: string };

export default function CustomImage({
  src,
  height,
  width,
  base64,
  alt,
  ...otherProps
}: Props) {
  if (!src) return null;
  if (typeof src === 'string' && (!height || !width)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} height={height} width={width} alt={alt} {...otherProps} />
    );
  }
  return (
    // next/image's intrinsic wrapper is inline-block, so it is centered by
    // text-align on this block-level span. A span (not a div) keeps the markup
    // valid inside the <p> that markdown images render into.
    <span className="block text-center">
      <Image
        layout="intrinsic"
        src={src}
        alt={alt}
        height={height}
        width={width}
        placeholder={base64 ? 'blur' : 'empty'}
        blurDataURL={base64}
        {...otherProps}
      />
    </span>
  );
}
