import React from 'react';

const GroupMembers = ({ members }) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Group Members</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="min-w-[150px] p-4 bg-white shadow-lg rounded-lg flex flex-col items-center"
          >
            <img
              src={`https://i.pravatar.cc/150?u=${member.id}`}
              alt={`${member.name}'s profile`}
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="text-sm font-medium text-center">{member.name}</p>
            <div className="w-full mt-2">
              <div className="bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${member.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GroupMembers;