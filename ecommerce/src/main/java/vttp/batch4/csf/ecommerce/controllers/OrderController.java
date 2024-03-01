package vttp.batch4.csf.ecommerce.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path="/api", consumes = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  public ResponseEntity<String> postOrder() {

    

    // TODO Task 3
	 
	 return null;
  }
}


// @PostMapping(path="/friend", consumes = MediaType.APPLICATION_JSON_VALUE)
// 	@ResponseBody
// 	public ResponseEntity<String> postFriend(@RequestBody String payload) {

// 		System.out.printf(">>> POST payload: %s\n", payload);

// 		Friend f = Friend.toFriend(payload);

// 		if (friendsSvc.add(f)) {
// 			JsonObject resp = Json.createObjectBuilder()
// 					.add("status", 200)
// 					.build();

// 			// 200 -> then()
// 			return ResponseEntity.ok(resp.toString());
// 		}

// 		JsonObject err = Json.createObjectBuilder()
// 				.add("message", "Cannot add friend")
// 				.add("status", 400)
// 				.build();

// 		// 400 -> catch()
// 		return ResponseEntity.status(400).body(err.toString());
// 	}