<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<script src="<c:url value="/resources/js/controller.js" /> "></script>

<div class="container-wrapper">
	<div class="container">
		<h2>Product Detail</h2>
		<p>Here is the detail information of the product!</p>

		<div class="row">
			<div class="col-md-6" style="">
				<c:set var="imageFilename" value="/resources/images/${product.id}.jpg" />
				<img src="<c:url value="${imageFilename}" />" alt="image" style="width: 80%" />
			</div>
			<div class="col-md-6">
				<h3>${product.name}</h3>
				<p>${product.description}</p>
				<p>Manufacturer: ${product.manufacturer}</p>
				<p>Category: ${product.category}</p>
				<p>${product.price}원</p>
			</div>
		</div>
	</div>
</div>