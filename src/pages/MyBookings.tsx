import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Chat from "@/pages/Chat";
import { Layout } from "@/components/layout/Layout";

interface Order {
  _id: string;
  status: string;
  createdAt: string;
  serviceId: {
    title: string;
  };
}

const MyBookings = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/orders/user/${user.id}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
  
    <Layout>
  <div className="min-h-screen bg-industrial-dark px-6 py-20">

    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-12 text-white flex justify-between items-start">
  
        <div>
          <div className="red-accent-bar mb-4" />
          <h2 className="industrial-heading text-secondary-foreground mb-2">
            My Bookings
          </h2>
          <p className="text-gray-400">
            Track and manage your industrial service requests
          </p>
        </div>

        {/*  CHAT BUTTON
        <Button onClick={() => setOpenChat(true)} variant="default">
          Chat 💬
        </Button> */}

      </div>

      

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
      <div className="text-center text-gray-400 mt-20">

        <p className="text-xl font-semibold mb-2">
          No bookings yet
        </p>

        <p className="text-sm mb-6">
          You haven’t booked any services. Start by exploring our offerings.
        </p>

        {/*  CTA BUTTON */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Book a Service
        </Link>

      </div>
    ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition"
            >

              {/* SERVICE TITLE */}
              <h3 className="text-xl font-semibold mb-2">
                {order.serviceId?.title}
              </h3>

              {/* DATE */}
              <p className="text-sm text-gray-400 mb-4">
                Booked on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              {/* STATUS */}
              <div className="flex items-center justify-between">

                <span className={`px-3 py-1 text-xs rounded-full font-medium
                  
                  ${order.status === "Pending" && "bg-yellow-500/20 text-yellow-400"}
                  ${order.status === "Approved" && "bg-blue-500/20 text-blue-400"}
                  ${order.status === "In Progress" && "bg-purple-500/20 text-purple-400"}
                  ${order.status === "Completed" && "bg-green-500/20 text-green-400"}
                
                `}>
                  {order.status}
                </span>

                <span className="text-xs text-gray-500">
                  #{order._id.slice(-6)}
                </span>

              </div>

              {/*  PROGRESS BAR */}
              <div className="mt-6">

                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Pending</span>
                  <span>Approved</span>
                  <span>In Progress</span>
                  <span>Done</span>
                </div>

                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-primary transition-all duration-500
                      ${
                        order.status === "Pending" && "w-[25%]"
                      }
                      ${
                        order.status === "Approved" && "w-[50%]"
                      }
                      ${
                        order.status === "In Progress" && "w-[75%]"
                      }
                      ${
                        order.status === "Completed" && "w-full"
                      }
                    `}
                  />
                </div>

              </div>

              

            </div>
          ))}

        </div>
      )}
    </div>

    {/*  FLOATING CHAT BUTTON (OPTIONAL like layout) */}
    {/* <button
      onClick={() => setOpenChat(true)}
      className="fixed bottom-6 left-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl hover:scale-110 transition z-50"
    >
      
    </button> */}

    {/*  CHAT PANEL */}
    <div
      className={`fixed bottom-20 right-6 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl border transform transition-all duration-300 z-50
      ${openChat ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >

      {/* HEADER */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3 rounded-t-xl">
        <span className="font-semibold text-sm">Support Chat</span>
        <button onClick={() => setOpenChat(false)}>✕</button>
      </div>

      {/* CHAT */}
      <div className="h-[calc(100%-50px)]">
        <Chat />
      </div>

    </div>
      </div>

      </Layout>
    );
    
};

export default MyBookings;