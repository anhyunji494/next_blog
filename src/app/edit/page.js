import Modify from "@/components/Modify";

export default function EditPage() {
  return (
    <Modify
      mode="edit"
      defaultData={{
        title: "블로그 글 타이틀",
        image1: "/example-image.jpg",
        image2: "/example-image.jpg",
        category: "일상생활",
        content: "일상생활 일상생활 일상생활",
        agreed: true,
      }}
    />
  );
}
