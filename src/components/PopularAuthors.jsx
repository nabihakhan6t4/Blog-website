import React, { useEffect, useState } from "react";
import axios from "axios";
import userLogo from "../assets/user.jpg";

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/authors");

      if (res.data.success) {
        setAuthors(res.data.authors);
      }
    } catch (error) {
      console.log("Error fetching authors", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      
      {/* Heading */}
      <div className="flex flex-col space-y-3 items-center">
        <h1 className="text-3xl md:text-4xl font-bold pt-10 text-gray-800 ">
          Popular Authors
        </h1>
        <hr className="w-24 border-2 border-red-500 rounded-full" />
      </div>

      <div className="flex flex-wrap items-center justify-center pb-10 gap-8 my-10">
        {authors?.slice(0, 3)?.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 p-4 rounded-xl 
                       shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={user?.photoUrl || userLogo}
              alt={`${user?.firstName} ${user?.lastName}`}
              className="rounded-full h-20 w-20 md:w-28 md:h-28 object-cover border-2 border-gray-200"
            />

            <p className="font-semibold text-gray-700 text-center">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAuthors;