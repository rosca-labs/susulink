import { useCircleStore } from "@/store/circleStore";
import { circleApi } from "@/lib/api";
import { toast } from "react-hot-toast";

export const useCircle = () => {
  const { activeCircle, setActiveCircle, isLoading, setIsLoading } = useCircleStore();

  const fetchCircleDetails = async (id: string) => {
    setIsLoading(true);
    try {
      // For now, we fetch from "mine" or a specific endpoint if it exists
      // In the prototype, we might just look through the list
      const res = await circleApi.getMyCircles(""); // Mocking address search
      const circle = res.data.find((c: any) => c.id === id);
      if (circle) {
        setActiveCircle(circle);
      }
    } catch (err) {
      toast.error("Failed to load circle details");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeCircle,
    isLoading,
    fetchCircleDetails,
  };
};