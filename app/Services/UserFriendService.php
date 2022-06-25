<?php

namespace App\Services;

use App\Http\Controllers\Controller;
use App\Models\UserFriend;
use App\Repositories\UserFriend\UserFriendRepository;

class UserFriendService extends Controller
{
    private $userFriendRepository;
    
    public function __construct()
    {
        $this->userFriendRepository = new UserFriendRepository();
    }

    public function updateFriendRequest($requestFriendId){
        $this->userFriendRepository->updateAccept($requestFriendId);
        $this->userFriendRepository->create($this->prepareData($requestFriendId, getUser()->id, true));
    }

    public function getFriend($friendId){
        return getUser()->friends()->where('friend_id', $friendId)->first();
    }

    public function cancelFriendRequest($requestFriendId){
        $this->userFriendRepository->cancelFriendRequest($requestFriendId);
    }

    public function getFriendRequest($requestFriendId){
        return $this->userFriendRepository->getFriendRequest($requestFriendId);
    }

    public function checkIfExistFriendRequest($friendId){
        return $this->userFriendRepository->checkIfExistRequest($friendId);
    }

    public function makeFriendRequest($friendId){
        $this->userFriendRepository->create($this->prepareData($friendId, getUser()->id, false));
    }

    private function prepareData($friendId, $userId, $accepted){
        $data = [
            'friend_id' => $friendId,
            'user_id' => $userId,
            'accepted' => $accepted
        ];
        return $data;
    }

    public function getFriendsByNameLike($name){
        return $this->userFriendRepository->getFriendsByNameLike($name);
    }
}
