package com.esb.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.esb.entity.User;

@Service
public interface IUserService {

    public List<User> getListUser();

    public User getUserByUserId(String userId);

    public User getUserByUserName(String username);

    public User getUserByEmail(String email);

    public User getUserByContactNumber(String contactNumber);

    public User getUser(String username, String password);

    public boolean addUser(User user);

    public boolean updateUser(String userId, Map<String, String> params);

    public boolean deleteUserByUserId(String userId);

    public Map<String, Integer> getPermissions(String username);
}
