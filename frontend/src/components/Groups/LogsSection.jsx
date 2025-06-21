import React from 'react';

const LogsSection = ({ logs, onVote }) => {
  return (
    <section className="mt-8">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Member Logs</h2>

      {/* Horizontal Scroll Container */}
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="min-w-[250px] bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-4"
          >
            {/* Member Image */}
            <img
              src={log.imageUrl}
              alt={`${log.memberName}'s proof`}
              className="w-full h-32 object-cover rounded-lg"
            />

            {/* Member Name */}
            <p className="font-medium text-gray-800 text-center">{log.memberName}</p>

            {/* Voting Buttons */}
            <div className="flex justify-between w-full space-x-4">
              <button
                onClick={() => onVote(log.id, "upvote")}
                className="flex items-center space-x-1 text-green-600 hover:text-green-700"
              >
                <span>👍</span>
                <span>{log.upvotes}</span>
              </button>
              <button
                onClick={() => onVote(log.id, "downvote")}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <span>👎</span>
                <span>{log.downvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogsSection;