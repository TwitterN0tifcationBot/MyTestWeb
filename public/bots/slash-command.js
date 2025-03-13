// Slash Command Page
import React, { useState } from 'react';
import axios from 'axios';

const SlashCommandPage = () => {
  const [commandName, setCommandName] = useState('');
  const [commandDescription, setCommandDescription] = useState('');
  const [commandOptions, setCommandOptions] = useState([]);

  const handleCreateCommand = async () => {
    try {
      const response = await axios.post('/api/slash-commands', {
        name: commandName,
        description: commandDescription,
        options: commandOptions,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOption = () => {
    setCommandOptions([...commandOptions, { name: '', description: '' }]);
  };

  const handleRemoveOption = (index) => {
    setCommandOptions(commandOptions.filter((option, i) => i !== index));
  };

  const handleOptionChange = (index, field, value) => {
    setCommandOptions(
      commandOptions.map((option, i) =>
        i === index ? { ...option, [field]: value } : option
      )
    );
  };

  return (
    <div>
      <h1>Create Slash Command</h1>
      <form>
        <label>
          Command Name:
          <input
            type="text"
            value={commandName}
            onChange={(e) => setCommandName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Command Description:
          <textarea
            value={commandDescription}
            onChange={(e) => setCommandDescription(e.target.value)}
          />
        </label>
        <br />
        <h2>Options:</h2>
        {commandOptions.map((option, index) => (
          <div key={index}>
            <label>
              Option Name:
              <input
                type="text"
                value={option.name}
                onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
              />
            </label>
            <br />
            <label>
              Option Description:
              <textarea
                value={option.description}
                onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={() => handleRemoveOption(index)}>
              Remove Option
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <br />
        <button type="button" onClick={handleCreateCommand}>
          Create Command
        </button>
      </form>
    </div>
  );
};

export default SlashCommandPage;