"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

import useAuthModal from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";

interface LikeButtonProps {
    songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single()
            
            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId);
            
            if (error) {
                toast.error(`Error: ${error.message || "Failed to remove song."}`);
            } else {
                setIsLiked(false);
                toast.success("Removed from liked songs!");
            }
        } else {
            const { error } = await supabaseClient
                .from("liked_songs")
                .insert({
                    song_id: songId,
                    user_id: user.id
                });

            if (error) {
                toast.error(`Error: ${error.message || "Failed to add song."}`);
            } else {
                setIsLiked(true);
                toast.success("Added to liked songs!");
            }
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="hover:opacity-75 active:!opacity-40 transition"
        >
            <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
        </button>
    );
}
 
export default LikeButton;