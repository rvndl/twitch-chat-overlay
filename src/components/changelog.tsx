export const Changelog = () => (
  <div className="p-2 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-md">
    <h2 className="text-lg">Changelog</h2>
    <ul className="mt-2 overflow-auto text-xs text-gray-300 list-disc list-inside max-h-32">
      <li className="flex items-center">
        <p>
          <strong>03/09/22</strong> - Lighten dark user colors
        </p>
      </li>
      <li className="flex items-center">
        <p>
          <strong>02/09/22</strong> - Added extra donk mode
        </p>
      </li>
      <li className="flex items-center">
        <p>
          <strong>01/09/22</strong> - Fixed emote height
        </p>
      </li>
      <li className="flex items-center">
        <p>
          <strong>01/09/22</strong> - Improved message shadow. <br />
          Reduced max emote width. Added gradient to NymN style
        </p>
      </li>
      <li className="flex items-center">
        <p>
          <strong>01/09/22</strong> - Added <code>!vanish</code> support for
          NymN style
        </p>
      </li>
      <li className="flex items-center">
        <p>
          <strong>01/09/22</strong> - Fixed 7TV bug
        </p>
        <img
          className="h-4 ml-1"
          src="https://cdn.7tv.app/emote/62fa9b8a589348b4bf5a0cb9/1x"
          alt="yeahbut7tv"
        />
      </li>
      <li className="flex items-center">
        <p>
          <strong>01/09/22</strong> - Added option to hide usernames
        </p>
      </li>
      <li className="flex items-center">
        <p>
          <strong>31/08/22</strong> - Initial release
        </p>
        <img
          className="w-10 ml-1"
          src="https://cdn.7tv.app/emote/61e85cd5699aab943eab76cc/1x"
          alt="forsenLevel"
        />
      </li>
    </ul>
  </div>
);
