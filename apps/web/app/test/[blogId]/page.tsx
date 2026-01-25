interface FormProps {
    params: Promise<{
        blogId: string;
    }>
} 

export default async function page( { params }: FormProps) {

    const { blogId } = await params;

    return (
    <div>Params - {blogId}</div>
  )
}
