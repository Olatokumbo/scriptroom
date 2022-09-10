interface IChooseFileInput {
  title: string;
  onChange: any;
  accept: string;
  required: boolean;
}
const ChooseFileInput: React.FC<IChooseFileInput> = ({ title, ...props }) => {
  return (
    <div className="mt-2 mb-5">
      <label htmlFor="media-files">
        <h1 className="font-bold text-gray-700 mb-2">{title}</h1>
      </label>
      <input
        type="file"
        id="media-files"
        className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
        "
        hidden
        {...props}
      />
    </div>
  );
};

export default ChooseFileInput;
