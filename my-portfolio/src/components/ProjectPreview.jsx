export default function ProjectPreview({
  src,
  alt,
  className = "",
  imgClassName = "",
  position = "center",
  loading = "lazy",
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable={false}
        className={`block h-full w-full min-h-full min-w-full object-cover ${imgClassName}`}
        style={{ objectPosition: position }}
      />
    </div>
  );
}
