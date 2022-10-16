package com.ecommerce.common.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "auc_product")
@Getter
@Setter
@NoArgsConstructor
public class Product extends IdBasedEntity {

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "image_paths")
	private String imagePaths;

	@Column(name = "init_price")
	private double initPrice;

	@Column(name = "start_auc")
	private Date startAuc;

	@Column(name = "end_auc")
	private Date endAuc;

	@Column(name = "step_price")
	private double stepPrice;
	
	@ManyToOne
	@JoinColumn(name = "owner_id", nullable = false)
	private Account owner;
	
	
}
