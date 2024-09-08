<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="height: 100%;" lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
<script src="https://cdn.jsdelivr.net/npm/ol@v7.5.2/dist/ol.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v7.5.2/ol.css">
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
<link rel="stylesheet" href="css/gisMainMap.css" type="text/css">
<meta charset="UTF-8">
<title>메인지도</title>
</head>
<body>
<header role="banner" id="menu">
<nav><span><a href="">전자지도</a></span><span><a href="">교통지도</a></span><span><a href="">재난지도</a></span><span><a href="">3D지도</a></span><span><a href="">통계지도</a></span></nav>
</header>
<div id="sideBar"></div>
<div id="resultList"></div>
<div id="mainMap"></div>
</body>
<script src="js/gisMainMap.js"></script>
</html>