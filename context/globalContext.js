import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";

export const GlobalContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  // input state
  const [InternshipTitle, setInternshipTitle] = useState("");
  const [internshipDescription, setInternshipDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [activeInternshipType, setActiveInternshipType] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [renumerated, setRenumerated] = useState(false);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/check-auth");
        setIsAuthenticated(res.data.isAuthenticated);
        setAuth0User(res.data.user);
        setLoading(false);
      } catch (error) {
        console.log("Error checking auth", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const getUserProfile = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`);

      setUserProfile(res.data);
    } catch (error) {
      console.log("Error getting user profile", error);
    }
  };

  // handle input change
  const handleTitleChange = (e) => {
    console.log(InternshipTitle);
    setInternshipTitle(e.target.value.trimStart());
  };

  const handleDescriptionChange = (e) => {
    setInternshipDescription(e.target.value.trimStart());
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const resetInternshipForm = () => {
    setInternshipTitle("");
    setInternshipDescription("");
    setSalary(0);
    setActiveInternshipType("");
    setSalaryType("");
    setNegotiable(false);
    setTags([]);
    setSkills([]);
    setLocation({
      country: "",
      city: "",
      address: "",
    });
  };

  useEffect(() => {
    console.log(isAuthenticated ? "Authenticated" : "Not Authenticated");
    if (isAuthenticated && auth0User) {
      getUserProfile(auth0User.sub);
    }
  }, [isAuthenticated, auth0User]);

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        auth0User,
        userProfile,
        getUserProfile,
        loading,
        InternshipTitle,
        internshipDescription,
        salary,
        activeInternshipType,
        salaryType,
        negotiable,
        tags,
        skills,
        location,
        renumerated ,
        handleTitleChange,
        handleDescriptionChange,
        handleSalaryChange,
        setActiveInternshipType,
        setInternshipDescription,
        setSalaryType,
        setNegotiable,
        setTags,
        setSkills,
        setLocation,
        setRenumerated,
        resetInternshipForm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
