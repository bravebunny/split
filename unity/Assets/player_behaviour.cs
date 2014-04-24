using UnityEngine;
using System.Collections;

public class player_behaviour : MonoBehaviour {

	public Rigidbody2D llama;

	public float startingHeight; 

	// Use this for initialization
	void Start () {
		startingHeight = llama.transform.position.y;
	}
	
	// Update is called once per frame
	void Update () {
		if (llama.transform.position.y <= startingHeight) {
			llama.transform.position = new Vector3(llama.transform.position.x, startingHeight, llama.transform.position.z);
			llama.velocity = new Vector2(0, 0);

			if (Input.GetKeyDown(KeyCode.Space)) {
				llama.AddForce(new Vector2(0, 1000f));
			}
		}
	}
}
