/*
Navicat MySQL Data Transfer

Source Server         : 10. LOCALHOST
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : a_dev

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-12-09 10:36:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for a_action_log
-- ----------------------------
DROP TABLE IF EXISTS `a_action_log`;
CREATE TABLE `a_action_log` (
  `id` varchar(255) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `function` varchar(255) DEFAULT NULL,
  `input` varchar(255) DEFAULT NULL,
  `output` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `strDateTime` varchar(255) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_function
-- ----------------------------
DROP TABLE IF EXISTS `a_function`;
CREATE TABLE `a_function` (
  `permission_id` int(11) NOT NULL,
  `role_id` varchar(255) NOT NULL,
  `permission_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permission_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_group
-- ----------------------------
DROP TABLE IF EXISTS `a_group`;
CREATE TABLE `a_group` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_group_has_function
-- ----------------------------
DROP TABLE IF EXISTS `a_group_has_function`;
CREATE TABLE `a_group_has_function` (
  `group_id` varchar(255) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `role_id` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`,`permission_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_group_has_user
-- ----------------------------
DROP TABLE IF EXISTS `a_group_has_user`;
CREATE TABLE `a_group_has_user` (
  `group_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_mapping_field_defined
-- ----------------------------
DROP TABLE IF EXISTS `a_mapping_field_defined`;
CREATE TABLE `a_mapping_field_defined` (
  `id` varchar(255) NOT NULL,
  `field_data_type` varchar(255) DEFAULT NULL,
  `field_name` varchar(255) DEFAULT NULL,
  `field_name_new` varchar(255) DEFAULT NULL,
  `field_value_const` varchar(255) DEFAULT NULL,
  `is_field_name_modify` bit(1) DEFAULT NULL,
  `is_field_value_modify` bit(1) DEFAULT NULL,
  `routing_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_role
-- ----------------------------
DROP TABLE IF EXISTS `a_role`;
CREATE TABLE `a_role` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_routing
-- ----------------------------
DROP TABLE IF EXISTS `a_routing`;
CREATE TABLE `a_routing` (
  `id` varchar(255) NOT NULL,
  `is_actived` bit(1) DEFAULT NULL,
  `is_mapping` bit(1) DEFAULT NULL,
  `service_id` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `timeout` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_service
-- ----------------------------
DROP TABLE IF EXISTS `a_service`;
CREATE TABLE `a_service` (
  `id` varchar(255) NOT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `context_path` varchar(255) DEFAULT NULL,
  `hostname` varchar(255) DEFAULT NULL,
  `is_actived` bit(1) DEFAULT NULL,
  `is_authen_header` bit(1) DEFAULT NULL,
  `is_result_array` bit(1) DEFAULT NULL,
  `message_format` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `protocol` varchar(255) DEFAULT NULL,
  `public_key_path` varchar(255) DEFAULT NULL,
  `secret_key` varchar(255) DEFAULT NULL,
  `service_code` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_transaction_log
-- ----------------------------
DROP TABLE IF EXISTS `a_transaction_log`;
CREATE TABLE `a_transaction_log` (
  `id` varchar(255) NOT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `input` varchar(255) DEFAULT NULL,
  `output` varchar(255) DEFAULT NULL,
  `service_id` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for a_user
-- ----------------------------
DROP TABLE IF EXISTS `a_user`;
CREATE TABLE `a_user` (
  `id` varchar(255) NOT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_date` bigint(20) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_signed_in` bigint(20) DEFAULT NULL,
  `last_updated` bigint(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
