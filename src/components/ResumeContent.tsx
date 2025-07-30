const ResumeContent = () => {
  return (
    <div className="prose prose-lg mx-auto my-16 text-center dark:prose-dark px-4 max-w-4xl">
      <h1>Experience</h1>

      <div className="mt-12 w-full max-w-5xl mx-auto">
        <iframe
          src="/resume.pdf"
          width="100%"
          height="800px"
          className="border rounded shadow-md"
          title="Resume PDF"
        />
      </div>
    </div>
  );
};

export default ResumeContent;
